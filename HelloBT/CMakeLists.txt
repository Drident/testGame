cmake_minimum_required(VERSION 3.0)
project(HelloBt)
set(CMAKE_AUTOMOC ON)
find_package(Qt5 COMPONENTS Core Bluetooth Mqtt Network)
add_executable(${PROJECT_NAME} main.cpp thingy.cpp Controller.cpp Controller.h gateway.cpp gateway.h)
target_link_libraries(${PROJECT_NAME} Qt5::Core Qt5::Bluetooth Qt5::Mqtt Qt5::Network)

# Fixes "qt.bluetooth.bluez: Missing CAP_NET_ADMIN permission…"
# Thanks to Sylvana Ieri for the solution.
find_program(SUDO sudo REQUIRED)
find_program(SETCAP setcap REQUIRED)
add_custom_command(
        TARGET ${PROJECT_NAME} POST_BUILD
        COMMAND ${SUDO} ${SETCAP} cap_net_admin+eip $<TARGET_FILE:${PROJECT_NAME}>
)

