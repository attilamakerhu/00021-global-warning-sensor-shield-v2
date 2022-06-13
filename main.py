"""

Environmental Sensor Board K.A. 2011

"""
"""

alapértékek beállítása

"""
pressure = 0
tvoc = 0
hum = 0
light2 = 0
co2 = 0
temp = 0
# rádiócsoport beállítása
radio.set_group(100)
# rádió teljesítmény beállítása
radio.set_transmit_power(7)
# szenzorok címzése
BME280.address(BME280_I2C_ADDRESS.ADDR_0X76)
airQuality.set_address(CCS811_I2C_ADDRESS.ADDR_0X5A)
# soros port átirányítása usb-re
serial.redirect_to_usb()
basic.show_string("" + str(airQuality.read_status()))

def on_forever():
    global temp, co2, light2, hum, tvoc, pressure
    temp = BME280.temperature(BME280_T.T_C)
    co2 = airQuality.read_co2()
    light2 = pins.analog_read_pin(AnalogPin.P1)
    hum = BME280.humidity()
    tvoc = airQuality.read_tvoc()
    pressure = BME280.pressure(BME280_P.PA)
    led.unplot(0, 0)
    # adatküldés soros portra
    serial.write_value("temp: ", temp)
    serial.write_value("hum: ", hum)
    serial.write_value("CO2: ", co2)
    serial.write_value("light: ", light2)
    serial.write_value("TVOC", tvoc)
    serial.write_value("pressure", pressure)
    serial.write_string("*****************")
    serial.write_line("")
    # adatküldés rádióra
    radio.send_value("temp", temp)
    basic.pause(50)
    radio.send_value("CO2", co2)
    basic.pause(50)
    radio.send_value("light", light2)
    basic.pause(50)
    radio.send_value("tvoc", tvoc)
    basic.pause(50)
    radio.send_value("hum", hum)
    basic.pause(50)
    radio.send_value("pressure", pressure)
    basic.pause(1000)
    led.plot(0, 0)
basic.forever(on_forever)
