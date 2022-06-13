// Broadcast environmental data one by one
function broadcastdata () {
    // adatküldés rádióra
    radio.sendValue("temp", temp)
    basic.pause(50)
    radio.sendValue("CO2", co2)
    basic.pause(50)
    radio.sendValue("light", light2)
    basic.pause(50)
    radio.sendValue("tvoc", tvoc)
    basic.pause(50)
    radio.sendValue("hum", hum)
    basic.pause(50)
    radio.sendValue("pressure", pressure)
}
function data2serial () {
    // adatküldés soros portra
    serial.writeValue("temp: ", temp)
    serial.writeValue("hum: ", hum)
    serial.writeValue("CO2: ", co2)
    serial.writeValue("light: ", light2)
    serial.writeValue("TVOC", tvoc)
    serial.writeValue("pressure", pressure)
    serial.writeString("*****************")
    serial.writeLine("")
}
let pause2 = 0
let pressure = 0
let hum = 0
let tvoc = 0
let light2 = 0
let co2 = 0
let temp = 0
// rádiócsoport beállítása
radio.setGroup(100)
// rádió teljesítmény beállítása
radio.setTransmitPower(7)
// Set sensor address
BME280.Address(BME280_I2C_ADDRESS.ADDR_0x76)
airQuality.setAddress(CCS811_I2C_ADDRESS.ADDR_0x5A)
// soros port átirányítása usb-re
serial.redirectToUSB()
basic.showString("" + (airQuality.readStatus()))
// Save environmental data  to variables
basic.forever(function () {
    pause2 = 50
    temp = BME280.temperature(BME280_T.T_C)
    co2 = airQuality.readCo2()
    light2 = pins.analogReadPin(AnalogPin.P1)
    hum = BME280.humidity()
    tvoc = airQuality.readTvoc()
    pressure = BME280.pressure(BME280_P.Pa) / 1000
    // Blink LED to indicate normal operation
    led.unplot(0, 0)
    data2serial()
    broadcastdata()
    basic.pause(1000)
    led.plot(0, 0)
})
