//
// Created by chris on 12.01.2023.
//

#include "Controller.h"
#include <QBluetoothAddress>
#include <QBluetoothDeviceInfo>
#include <QDebug>
#include <QtCore>

Controller::Controller() {
    //addresses.push_back(QBluetoothAddress("FC:32:FA:4B:42:DE"));
    //addresses.push_back(QBluetoothAddress("D5:2F:7E:30:10:5A"));

}
Controller::~Controller(){

}

void Controller::runMqtt() {
    qDebug()<< "Start Mqtt :";
    QFile jsonFile("../sdi-config.json");
    jsonFile.open(QIODevice::ReadOnly);
    QByteArray jsonData = jsonFile.readAll();
    QJsonDocument json = QJsonDocument::fromJson(jsonData);
    if(json.isObject()) {
        QJsonObject config = json.object();
        if(config["broker"].isObject()) {
            QJsonObject brokerInfo = config["broker"].toObject();
            mqttClient.setHostname(brokerInfo["host"].toString());
            mqttClient.setPort(brokerInfo["port"].toInt());
            mqttClient.setUsername(brokerInfo["username"].toString());
            mqttClient.setPassword(brokerInfo["password"].toString());
            mqttClient.setCleanSession(true);
            mqttClient.setWillTopic(mqttClient.username() + "/status");
            mqttClient.setWillMessage("offline");
            mqttClient.setWillRetain(true);
            mqttClient.connectToHost();

            qDebug() << "Connecting to MQTT Broker...";
            qDebug() << mqttClient.hostname();
            qDebug() << mqttClient.port();
            qDebug() << mqttClient.username();
            qDebug() << mqttClient.password();

            QObject::connect(&mqttClient, SIGNAL(connected()),
                             this, SLOT(onMqttConnected()));

            QObject::connect(&mqttClient, SIGNAL(messageReceived(QByteArray, QMqttTopicName)),
                             this, SLOT(onMqttMessageReceived(QByteArray, QMqttTopicName)));

        }
        else{
            qDebug()<<"json config file 1 is invalid\nPlease check sdi-config.json";
        }
    }
    else{
        qDebug()<<"json config file 2 is invalid\nPlease check sdi-config.json";
    }
}

void Controller::runThingies() {
    qDebug()<<"--------------------------------------------------------------------";
    qDebug()<<"START the runThingies";
    QFile configFile("../sdi-config.json");
    configFile.open(QIODevice::ReadOnly);
    QByteArray jsonData = configFile.readAll();
    QJsonDocument json = QJsonDocument::fromJson(jsonData);
    QJsonObject broker = json["broker"].toObject();
    if(jsonData.isEmpty()) {
        qDebug()<<"Config file is empty\nPlease check sdi-config.json";
    }
    QJsonArray jTingies = json ["thingies"].toArray();
    if(!jTingies.isEmpty()) {
        for(auto  t:jTingies){
            this->addresses.push_back(QBluetoothAddress(t.toString()));
            qDebug()<< "My thingy: " << t.toString();
        }
    }
    connectThingies();
    qDebug()<<"--------------------------------------------------------------------";
}

void Controller::connectThingies() {
    thingies = Thingy::discover(addresses);
    qDebug() << "thingies to connect:";
    for (auto device: thingies) {
        qDebug() << device.name() << device.address() ;
    }
    for(QBluetoothDeviceInfo connectThingy :thingies)
    {
        qDebug() << "Connecting to " << connectThingy.address();
        Thingy* thingy = Thingy::connect(connectThingy);
        addresses.removeAll(thingy->address());
        QObject::connect(thingy, SIGNAL(buttonStateChanged(bool)),this, SLOT(onButtonChanged(bool)));
        // Raw IMU
        QObject::connect(thingy, SIGNAL(eulerDataChanged(Thingy::eulerDATA)),
                         this, SLOT(onEulerDATAChanged(Thingy::eulerDATA)));
        QObject::connect(thingy, SIGNAL(rawDataChanged(Thingy::rawDATA)),
                         this, SLOT(onRawDATAChanged(Thingy::rawDATA)));
        myThingyList<<thingy;;
    }
}

void Controller::onButtonChanged(bool value) {
    qDebug() << " Button state has changed";
    auto* t = qobject_cast<Thingy*>(sender());
    QMqttTopicName topicName(mqttClient.username()+"/"+t->address().toString()+"/button" );
    mqttClient.publish(topicName, value ? "Pressed" : "Released");
    for(Thingy* thingy: myThingyList)
    {
        if(t == thingy){
            if(value == true){
                qDebug() << " Green";
                thingy->setLedColor(0,255,0);
            }
            else{
                thingy->setLedOff();
            }
        }
        else{
            if(value == true){
                qDebug() << " Red";
                thingy->setLedColor(255,0,0);
            }
            else{
                thingy->setLedOff();
            }
        }
    }
}

void Controller::onEulerDATAChanged(Thingy::eulerDATA dataPos) {
    auto* t = qobject_cast<Thingy*>(sender());
    QMqttTopicName topicName(mqttClient.username()+"/"+t->address().toString()+"/controller" );
    QMqttTopicName topicName2(mqttClient.username()+"/"+t->address().toString()+"/euler" );

    QJsonObject json, json2;

    if(dataPos.change){
        json.insert("right", dataPos.right);
        json.insert("left", dataPos.left);
        json.insert("stable", dataPos.stable);
        json.insert("down", dataPos.down);
        json.insert("change", dataPos.change);
        mqttClient.publish(topicName, QJsonDocument(json).toJson());
    }

    json2.insert("rot_x", dataPos.roll_x);
    json2.insert("rot_y", dataPos.pitch_y);
    json2.insert("rot_z", dataPos.yaw_z);
    mqttClient.publish(topicName2, QJsonDocument(json2).toJson());
}

void Controller::onRawDATAChanged(Thingy::rawDATA dataAcc) {
    auto* t = qobject_cast<Thingy*>(sender());
    QMqttTopicName topicName(mqttClient.username()+"/"+t->address().toString()+"/hit" );
    QMqttTopicName topicName2(mqttClient.username()+"/"+t->address().toString()+"/raw" );

    /*QJsonObject json, json2;
    json.insert("hit", hit);
    mqttClient.publish(topicName, QJsonDocument(json).toJson());*/

    /*json2.insert("acc_x", dataAcc.acc_x/100);
    json2.insert("acc_y", dataAcc.acc_y/100);
    json2.insert("acc_z", dataAcc.acc_z/100);
    mqttClient.publish(topicName2, QJsonDocument(json2).toJson());*/
}

void Controller::onMqttConnected() {
    QMqttTopicName topicName(mqttClient.username() + "/status");
    QMqttTopicFilter textTopic_1(mqttClient.username() + "/text");
    QMqttTopicFilter textTopic_2(mqttClient.username() + "/+/text");
    QMqttTopicFilter ledTopic(mqttClient.username() + "/+/led");

    qDebug() << "Connected to MQTT Broker";

    mqttClient.publish(topicName, "online", 0, true);
    mqttClient.subscribe(textTopic_1);
    mqttClient.subscribe(textTopic_2);
    mqttClient.subscribe(ledTopic);
}

void Controller::onMqttMessageReceived(const QByteArray &message, const QMqttTopicName &topic) {
    qDebug() << "Receive message :";
    if (topic.levelCount() == 3 && topic.levels()[0] == mqttClient.username()) {
        if (topic.levels()[2] == "led") {
            QJsonDocument json = QJsonDocument::fromJson(message);
            if (json.isObject()) {
                QJsonObject ledColor = json.object();
                qDebug() << "New color for" << topic.levels()[1];
                for (auto thingy: myThingyList) {
                    if (thingy->address().toString() == topic.levels()[1]) {
                        thingy->setLedColor(ledColor["red"].toInt(), ledColor["green"].toInt(),
                                            ledColor["blue"].toInt());
                        break;
                    }
                }
            }
        }
        else if (topic.levels()[2] == "text") {
            QJsonDocument jsonText = QJsonDocument::fromJson(message);
            qDebug()<< "message : " << message;
        }
    }
    else if (topic.levels()[0] == mqttClient.username() && topic.levels()[1] == "text") {
        QJsonDocument jsonText = QJsonDocument::fromJson(message);
        qDebug()<< "message : " << message;

    }
}

void Controller::run() {
    runMqtt();
    runThingies();
}
