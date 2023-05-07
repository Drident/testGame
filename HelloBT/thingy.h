#pragma once
#include <QObject>
#include <QBluetoothAddress>
#include <QList>
#include <QBluetoothUuid>
#include <QBluetoothDeviceInfo>
#include <QLowEnergyController>
#include <QLowEnergyService>
#include <QLowEnergyCharacteristic>
#include <QByteArray>
#include <functional>
#include <QList>
#include <QBluetoothDeviceInfo>
#include <QBluetoothDeviceDiscoveryAgent>
#include <QEventLoop>
#include <QStringLiteral>

#define BTN_PRESSED "\x01"
class Thingy : public QObject {

    /*
     * This macro is needed in order the Qt Metaobject Compiler is invoked and signal/slots work.
     */
    Q_OBJECT

  public:
    /*
     * Defines the 4 states the Thingy can be in.
     */
    Thingy();
    enum State { Connecting, Discovering, Ready, Disconnected };

    struct eulerDATA {
        int roll_x;
        int pitch_y;
        int yaw_z;
        bool change, left, right, stable, down;
    };
    struct rawDATA {
        int acc_x;
        int acc_y;
        int acc_z;
        bool hit, changeAcc ;
    };
/*
     * Discover thingies as seen on Qt Bluetooth hands-on.
     *
     * THIS IS THE ONLY METHOD THAT WILL USE QEventLoop, AVOID IT FOR ALL OTHERS!
     */
    static QList<QBluetoothDeviceInfo> discover(const QList<QBluetoothAddress>& addresses = QList<QBluetoothAddress>());

    /*
     * Creates a thingy instance and initiates connection to Thingy.
     *
     * - Create a new Thingy instance.
     * - Create a new QLowEnergyController using QLowEnergyController::createCentral).
     * - Connect controller's signals to Thingy's slots (3).
     * - Set random address on controller.
     * - Initiate Bluetooth connection.
     */
    static Thingy* connect(const QBluetoothDeviceInfo& info, QObject* parent = nullptr);

    /*
     * Disconnects from Thingy.
     *
     * - Call disconnect on controller.
     * - Set state to Disconnected.
     */
    void disconnect();

    inline State state() const {
        return state_;
    }

    inline QBluetoothAddress address() const {
        return controller_->remoteAddress();
    }

    /*
     * Turns LED off on Thingy.
     *
     * - Write 0x0100 the LED characteristic.
     */
    void setLedOff();

    /*
     * Changes LED color.
     *
     * - Write correct command and RGB data to LED characteristic.
     */
    void setLedColor(quint8 red, quint8 green, quint8 blue);

  signals:
    /*
     * Emitted every time the state of the Thingy changes.
     *
     * (If you use always the method setState_() to set the state you can automate signal sending).
     */
    void stateChanged(State state);

    /*
     * Emitted whenever the state of the button on the connected Thingy changes.
     */
    void buttonStateChanged(bool value);

    /* Connect this slot to the characteristicChanged() slot of the UI service.
    *
    * -
    */
    void eulerDataChanged(Thingy::eulerDATA dataPos);

    void rawDataChanged(Thingy::rawDATA dataAcc);



  private slots:
    /*
     * Connect this slot to the controller's connected() signal.
     *
     * - Set state to Discovering.
     * - Start service discovery.
     */
    void onConnected_();

    /*
     * Connect this slot to the controllers serviceDiscovered() signal.
     *
     * - Ignore all services found except the UI service (Thingy offers more services...)
     * - Create the service object (createServiceObject() method of controller).
     * - Discover service details.
     */
    void onServiceDiscovered_(const QBluetoothUuid& newService);

    /*
     * Connect this slot to the UI services stateChanged() signal.
     *
     * - Ignore all calls except if the new state is ServiceDiscovered.
     * - Setup button notify.
     * - Change state to connected.
     */
    void onServiceStateChanged_(QLowEnergyService::ServiceState newState);

    /*
     * Connect this slot to the characteristicChanged() slot of the UI service.
     *
     * - Check that it is the button characteristic.
     * - Interpret received value.
     * - emit buttonStateChanged() signal depending on received the button state.
     */
    void onCharacteristicChanged_(const QLowEnergyCharacteristic& characteristic, const QByteArray& value);

    /*
     * Connect this signal to the disconnected() signal of the controller.
     *
     * - Set state to Disconnected.
     */
    void onDisconnected_();

  private:
    /*
     * The constructor is private to ensure Thingy instances can only be created using the Thingy::connect() method.
     *
     * FYI: The explicit keyword ensures that the constructor has to be explicitly called, otherwise it would be possible to automatically cast any QObject into a thingy, which we do not want.
     */
    explicit Thingy(QObject* parent) : QObject(parent) {}

    /*
     * Enables notifications, the implementation of this method can be found in the Qt Bluetooth hands-on.
     */
    static bool setNotify_(QLowEnergyService& service, const QLowEnergyCharacteristic& characteristic, bool enabled);

    /*
     * Sets the new state and emits the stateChanged() signal, if the state effectively has changed.
     */
    void setState_(State state);

    /*
     * State variable.
     *
     * Never access it directly, use the setState_() method, this guarantees that every time the state changes, the signal stateChanged() is emitted.
     */
    State state_ = Connecting;

    /*
     * Bluetooth Low Energy Controller, set it up in the Thingy::connect() method.
     */
    QLowEnergyController* controller_ = nullptr;

    /*
     * Thingy UI service, set it in the onServiceDiscovered() method.
     */
    QLowEnergyService* uiService_ = nullptr;

    QLowEnergyService* uiServiceMotion_ = nullptr;


    /*
     *
     */
    eulerDATA dataPos, oldDataPos;
    rawDATA dataAcc, oldDataAcc ;

    /*
     * UUID if the Thingy main service.
     */
    static const QBluetoothUuid ThingyServiceUuid_;

    /*
     * UUID of the UI service.
     */
    static const QBluetoothUuid UiServiceUuid_;

    /*
     * UUID of the LED characteristic.
     */
    static const QBluetoothUuid UiLedCharacteristicUuid_;

    /*
     * UUID of the button characteristic.
     */
    static const QBluetoothUuid UiButtonCharacteristicUuid_;

    /*
     * UUID of the Raw data change characteristic.
     */
    static const QBluetoothUuid UiDataCharacteristicChangeUuid_;

    static const QBluetoothUuid UiMotionServiceChangeUuid_;

    static const QBluetoothUuid UiRawCharacteristicChangeUuid_;
};
