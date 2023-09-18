import minestat
import threading
import time

host = "blablabla"
port_range = range(19130, 19999)
threads = []

def check_port(port):
    try:
        ms = minestat.MineStat(host, port)
        if ms.online:
            print(f"Server is online on port: {port}")
        else:
            print(f"Minecraft server is offline on port {port}")
    except Exception as e:
        print(f"Error checking port {port}: {str(e)}")

for port in port_range:
    t = threading.Thread(target=check_port, args=(port,))
    threads.append(t)
    t.start()
    time.sleep(1)  # bekletme

for t in threads:
    t.join()