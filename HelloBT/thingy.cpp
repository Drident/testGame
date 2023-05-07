#include "thingy.h"

const QBluetoothUuid Thingy::ThingyServiceUuid_(QStringLiteral("ef680100-9b35-4933-9b10-52ffa9740042")); // ef680300 for this lab WARNING !
const QBluetoothUuid Thingy::UiServiceUuid_ (QStringLiteral("ef680300-9b35-4933-9b10-52ffa9740042"));
const QBluetoothUuid Thingy::UiLedCharacteristicUuid_ (QStringLiteral("ef680301-9b35-4933-9b10-52ffa9740042"));
const QBluetoothUuid Thingy::UiButtonCharacteristicUuid_ (QStringLiteral("ef680302-9b35-4933-9b10-52ffa9740042"));

const QBluetoothUuid Thingy::UiMotionServiceChangeUuid_ (QStringLiteral("ef680400-9b35-4933-9b10-52ffa9740042"));
const QBluetoothUuid Thingy::UiDataCharacteristicChangeUuid_ (QStringLiteral("ef680407-9b35-4933-9b10-52ffa9740042"));
const QBluetoothUuid Thingy::UiRawCharacteristicChangeUuid_ (QStringLiteral("ef680406-9b35-4933-9b10-52ffa9740042"));


QList<QBluetoothDeviceInfo> Thingy::discover(const QList<QBluetoothAddress>& addresses) {
    qDebug() << "discovert start";

    QBluetoothDeviceDiscoveryAgent agent;
    QEventLoop loop;
    QList<QBluetoothDeviceInfo> devices;

    QObject::connect(&agent, SIGNAL(finished()), &loop, SLOT(quit()));
    agent.start();
    loop.exec();
    for (auto device: agent.discoveredDevices()) {
        if (device.serviceUuids().contains(ThingyServiceUuid_)) {
            qDebug()<<device.address();
            for(auto addresse: addresses) {
                if(addresse==device.address()){
                        devices << device;
                }
            }
        }
    }
    return devices;
}

Thingy *Thingy::connect(const QBluetoothDeviceInfo &info, QObject *parent) {
    // Creates new Thingy instance
    Thingy* thingy = new Thingy(parent);
    thingy->controller_ = QLowEnergyController::createCentral(info, parent);
    qDebug()<<"try to connect...";

        QObject::connect(thingy->controller_, SIGNAL(connected()), thingy, SLOT(onConnected_()));
        QObject::connect(thingy->controller_, SIGNAL(serviceDiscovered(const QBluetoothUuid &)), thingy,
                         SLOT(onServiceDiscovered_(const QBluetoothUuid &)), Qt::QueuedConnection);
        thingy->controller_->setRemoteAddressType(QLowEnergyController::RandomAddress);

        thingy->controller_->connectToDevice();
        return thingy;


}

void Thingy::disconnect() {
    controller_->disconnectFromDevice();
    setState_(Disconnected);
}

void Thingy::setLedOff() {
    uiService_->writeCharacteristic(uiService_->characteristic(UiLedCharacteristicUuid_),QByteArray::fromHex("01000000"));
}

void Thingy::setLedColor(quint8 red, quint8 green, quint8 blue) {
    QByteArray color;
    color.append(1).append(red).append(green).append(blue);
    uiService_->writeCharacteristic(uiService_->characteristic(UiLedCharacteristicUuid_),color);
}

void Thingy::onConnected_() {
    qDebug() << "Connected";
    controller_->discoverServices();
    setState_(Discovering);
}

void Thingy::onServiceDiscovered_(const QBluetoothUuid &newService) {
    if(newService==UiServiceUuid_){
        qDebug() << "button service";

        uiService_ = controller_->createServiceObject(newService);

        QObject::connect(uiService_, SIGNAL(stateChanged(QLowEnergyService::ServiceState)),
                         this, SLOT(onServiceStateChanged_(QLowEnergyService::ServiceState)));

        QObject::connect(uiService_, SIGNAL(characteristicChanged(const QLowEnergyCharacteristic&, const QByteArray&)),
                         this, SLOT(onCharacteristicChanged_(const QLowEnergyCharacteristic &, const QByteArray &)));

        uiService_->discoverDetails();
    }
    if(newService==UiMotionServiceChangeUuid_){
        qDebug() << "euler service";
        uiServiceMotion_ = controller_->createServiceObject(newService);

        QObject::connect(uiServiceMotion_, SIGNAL(characteristicChanged(const QLowEnergyCharacteristic&, const QByteArray&)),
                         this, SLOT(onCharacteristicChanged_(const QLowEnergyCharacteristic &, const QByteArray &)));

        uiServiceMotion_->discoverDetails();
    }
}

void Thingy::onServiceStateChanged_(QLowEnergyService::ServiceState newState) {
    QLowEnergyCharacteristic button = uiService_->characteristic(UiButtonCharacteristicUuid_);
    if(setNotify_(*uiService_, button, true)){
        setState_(Ready);
        this->setLedOff();
    }
    QLowEnergyCharacteristic euler = uiServiceMotion_->characteristic(UiDataCharacteristicChangeUuid_);
    if(setNotify_(*uiServiceMotion_, euler, true)){
        setState_(Ready);
    }
    QLowEnergyCharacteristic raw = uiServiceMotion_->characteristic(UiRawCharacteristicChangeUuid_);
    if(setNotify_(*uiServiceMotion_, raw, true)){
        setState_(Ready);
    }
}


void Thingy::onCharacteristicChanged_(const QLowEnergyCharacteristic &characteristic, const QByteArray &value) {
    if (characteristic.uuid() == UiButtonCharacteristicUuid_) {
        if (value == BTN_PRESSED) {
            qDebug() << "Button pressed";
            emit buttonStateChanged(true);
        } else {
            qDebug() << "Button released";
            emit buttonStateChanged(false);
        }
    }
    else if(characteristic.uuid() == UiDataCharacteristicChangeUuid_){
        // value[2] -> rot_x // value[6] -> rot_y // value[10] -> rot_z
        dataPos.roll_x = value[2];
        dataPos.pitch_y = value[6];
        dataPos.yaw_z = value[10];
        dataPos.change = false;
        //qDebug() << this->address();

        if((dataPos.roll_x<=90)&&(dataPos.roll_x>=25)&& dataPos.right==false){
            dataPos.left = false;
            dataPos.right = true;
            dataPos.stable = false;
            dataPos.change = true;
        }
        else if((dataPos.roll_x<=235)&&(dataPos.roll_x>=164)&&dataPos.left==false){
            dataPos.left = true;
            dataPos.right = false;
            dataPos.stable = false;
            dataPos.change = true;
        }
        else if(((dataPos.roll_x<=25)||(dataPos.roll_x>=240))&&dataPos.stable==false){
            dataPos.left = false;
            dataPos.right = false;
            dataPos.stable = true;
            dataPos.change = true;
            qDebug() << " stable";
        }
        if((dataPos.pitch_y<=235)&&(dataPos.pitch_y>=200)&& !dataPos.change){
            dataPos.change = true;
            dataPos.down = true;
            qDebug() << " down";

        }
        else if(dataPos.down){
            dataPos.down = false;
            dataPos.change = true;
        }
        if(dataPos.change) {
            emit eulerDataChanged(dataPos);
        }
    }
    else if(characteristic.uuid() == UiRawCharacteristicChangeUuid_){
        dataAcc.acc_x = value[0];
        dataAcc.acc_y  = value[2];
        dataAcc.acc_z = value[4];
        dataAcc.changeAcc = false;
        if(((dataAcc.acc_x < 40)&&(dataAcc.acc_y < 40))&& dataAcc.hit == false){
            dataAcc.hit = true;
            dataAcc.changeAcc = true;
        }
        else if (((dataAcc.acc_x > 150)&&(dataAcc.acc_y > 150))&& dataAcc.hit == true){
            dataAcc.hit = false;
            dataAcc.changeAcc = true;
        }
        /*if(dataAcc.changeAcc) {
            emit rawDataChanged(dataAcc);
        }*/
        emit rawDataChanged(dataAcc);
    }
}

void Thingy::onDisconnected_() {
    setState_(Disconnected);
}

bool Thingy::setNotify_(QLowEnergyService &service, const QLowEnergyCharacteristic &characteristic, bool enabled) {

    auto notifyDescriptor = characteristic.descriptor(QBluetoothUuid::ClientCharacteristicConfiguration);

    if (!notifyDescriptor.isValid())
        return false;

    service.writeDescriptor(notifyDescriptor, QByteArray()
            .append(static_cast<char>(enabled ? 1U : 0U))
            .append(static_cast<char>(0U)));

    return true;
}

void Thingy::setState_(Thingy::State state) {
    if(state_!= state){
        state_ = state;
        emit stateChanged(state_);
    }

}

Thingy::Thingy() {
    dataPos.change = false;
    dataPos.down= false;

}

