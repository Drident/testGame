/****************************************************************************
** Meta object code from reading C++ file 'thingy.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.15.2)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include <memory>
#include "../../../thingy.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'thingy.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.15.2. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_Thingy_t {
    QByteArrayData data[18];
    char stringdata0[263];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_Thingy_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_Thingy_t qt_meta_stringdata_Thingy = {
    {
QT_MOC_LITERAL(0, 0, 6), // "Thingy"
QT_MOC_LITERAL(1, 7, 12), // "stateChanged"
QT_MOC_LITERAL(2, 20, 0), // ""
QT_MOC_LITERAL(3, 21, 5), // "State"
QT_MOC_LITERAL(4, 27, 5), // "state"
QT_MOC_LITERAL(5, 33, 18), // "buttonStateChanged"
QT_MOC_LITERAL(6, 52, 5), // "value"
QT_MOC_LITERAL(7, 58, 12), // "onConnected_"
QT_MOC_LITERAL(8, 71, 20), // "onServiceDiscovered_"
QT_MOC_LITERAL(9, 92, 14), // "QBluetoothUuid"
QT_MOC_LITERAL(10, 107, 10), // "newService"
QT_MOC_LITERAL(11, 118, 22), // "onServiceStateChanged_"
QT_MOC_LITERAL(12, 141, 31), // "QLowEnergyService::ServiceState"
QT_MOC_LITERAL(13, 173, 8), // "newState"
QT_MOC_LITERAL(14, 182, 24), // "onCharacteristicChanged_"
QT_MOC_LITERAL(15, 207, 24), // "QLowEnergyCharacteristic"
QT_MOC_LITERAL(16, 232, 14), // "characteristic"
QT_MOC_LITERAL(17, 247, 15) // "onDisconnected_"

    },
    "Thingy\0stateChanged\0\0State\0state\0"
    "buttonStateChanged\0value\0onConnected_\0"
    "onServiceDiscovered_\0QBluetoothUuid\0"
    "newService\0onServiceStateChanged_\0"
    "QLowEnergyService::ServiceState\0"
    "newState\0onCharacteristicChanged_\0"
    "QLowEnergyCharacteristic\0characteristic\0"
    "onDisconnected_"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_Thingy[] = {

 // content:
       8,       // revision
       0,       // classname
       0,    0, // classinfo
       7,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       2,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    1,   49,    2, 0x06 /* Public */,
       5,    1,   52,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
       7,    0,   55,    2, 0x08 /* Private */,
       8,    1,   56,    2, 0x08 /* Private */,
      11,    1,   59,    2, 0x08 /* Private */,
      14,    2,   62,    2, 0x08 /* Private */,
      17,    0,   67,    2, 0x08 /* Private */,

 // signals: parameters
    QMetaType::Void, 0x80000000 | 3,    4,
    QMetaType::Void, QMetaType::Bool,    6,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void, 0x80000000 | 9,   10,
    QMetaType::Void, 0x80000000 | 12,   13,
    QMetaType::Void, 0x80000000 | 15, QMetaType::QByteArray,   16,    6,
    QMetaType::Void,

       0        // eod
};

void Thingy::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        auto *_t = static_cast<Thingy *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->stateChanged((*reinterpret_cast< State(*)>(_a[1]))); break;
        case 1: _t->buttonStateChanged((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 2: _t->onConnected_(); break;
        case 3: _t->onServiceDiscovered_((*reinterpret_cast< const QBluetoothUuid(*)>(_a[1]))); break;
        case 4: _t->onServiceStateChanged_((*reinterpret_cast< QLowEnergyService::ServiceState(*)>(_a[1]))); break;
        case 5: _t->onCharacteristicChanged_((*reinterpret_cast< const QLowEnergyCharacteristic(*)>(_a[1])),(*reinterpret_cast< const QByteArray(*)>(_a[2]))); break;
        case 6: _t->onDisconnected_(); break;
        default: ;
        }
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        switch (_id) {
        default: *reinterpret_cast<int*>(_a[0]) = -1; break;
        case 3:
            switch (*reinterpret_cast<int*>(_a[1])) {
            default: *reinterpret_cast<int*>(_a[0]) = -1; break;
            case 0:
                *reinterpret_cast<int*>(_a[0]) = qRegisterMetaType< QBluetoothUuid >(); break;
            }
            break;
        case 4:
            switch (*reinterpret_cast<int*>(_a[1])) {
            default: *reinterpret_cast<int*>(_a[0]) = -1; break;
            case 0:
                *reinterpret_cast<int*>(_a[0]) = qRegisterMetaType< QLowEnergyService::ServiceState >(); break;
            }
            break;
        case 5:
            switch (*reinterpret_cast<int*>(_a[1])) {
            default: *reinterpret_cast<int*>(_a[0]) = -1; break;
            case 0:
                *reinterpret_cast<int*>(_a[0]) = qRegisterMetaType< QLowEnergyCharacteristic >(); break;
            }
            break;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        {
            using _t = void (Thingy::*)(State );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&Thingy::stateChanged)) {
                *result = 0;
                return;
            }
        }
        {
            using _t = void (Thingy::*)(bool );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&Thingy::buttonStateChanged)) {
                *result = 1;
                return;
            }
        }
    }
}

QT_INIT_METAOBJECT const QMetaObject Thingy::staticMetaObject = { {
    QMetaObject::SuperData::link<QObject::staticMetaObject>(),
    qt_meta_stringdata_Thingy.data,
    qt_meta_data_Thingy,
    qt_static_metacall,
    nullptr,
    nullptr
} };


const QMetaObject *Thingy::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *Thingy::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_Thingy.stringdata0))
        return static_cast<void*>(this);
    return QObject::qt_metacast(_clname);
}

int Thingy::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 7)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 7;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 7)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 7;
    }
    return _id;
}

// SIGNAL 0
void Thingy::stateChanged(State _t1)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(std::addressof(_t1))) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void Thingy::buttonStateChanged(bool _t1)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(std::addressof(_t1))) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
