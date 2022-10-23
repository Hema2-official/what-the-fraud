import geopy
import geopy.distance

class Point:
    def __init__(self, lat, lon):
        self.lat = lat
        self.lon = lon

    def __str__(self):
        return "Point: (%s, %s)" % (self.x, self.y)


def getDistance(p1: Point, p2: Point):
    return geopy.distance.geodesic((p1.lat, p1.lon), (p2.lat, p2.lon)).km

def getAddress(p: Point):
    return geopy.geocoders.Nominatim(user_agent="junctionx.what.the.fraud@gmail.com").reverse((p.lat, p.lon))