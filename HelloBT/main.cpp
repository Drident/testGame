#include <QCoreApplication>
#include <QThread>
#include "Controller.h"
#include "iostream"
#include <QtCore>
#include <QtMqtt>

void emptyBluetoothCache()
{
    //stop, clear and restart the bluetooth service of the PI
    system("sudo sh -c \"systemctl stop bluetooth && rm -rf /var/lib/bluetooth/* && systemctl start bluetooth\"");
    //wait some seconds to restart the bluetooth service of the PI
    QThread::msleep(1000);
}

int main(int argc, char** argv) {
    //sdi05.hevs.ch
    //sdi05.local
    //bb13ca08b476fbde0f6a0783f6632d50

    QCoreApplication application(argc, argv);

    Controller button;
    try {
        button.run();
        application.exec();
    } catch (std::exception err) {
        application.exit();
    }
}
