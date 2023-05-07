//
// Created by chris on 12.01.2023.
//

#ifndef HELLOBT_CONTROLLER_H
#define HELLOBT_CONTROLLER_H


#include <QArgument>
#include <QObject>
#include <QtMqtt>
#include "thingy.h"

class Controller : public QObject {
    Q_OBJECT

public :
    Controller();

    ~Controller();

    void runMqtt();

    void runThingies();

    void connectThingies();

    void run();
private:
    QList<Thingy*> myThingyList;

    QList<QBluetoothDeviceInfo> thingies;

    QList<QBluetoothAddress> addresses;

    QMqttClient mqttClient; // MQTT client (connection to Broker)
    bool change, left, right, stable, down, hit, changeAcc ;


private slots:

    void onButtonChanged(bool value);

    void onMqttConnected();

    void onMqttMessageReceived(const QByteArray& message, const QMqttTopicName& topic);

    void onEulerDATAChanged(Thingy::eulerDATA dataPos);

    void onRawDATAChanged(Thingy::rawDATA dataPos);


};


#endif //HELLOBT_CONTROLLER_H
