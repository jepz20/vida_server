db.usuarios.remove({"_id": ObjectId("540fdd594937351d392e4d6b")});
db.usuarios.remove({"email": "pruebas@example.com"});
db.donacions.remove({"_id" : ObjectId("540fddd24937351d392e4d6f")});
db.lugars.remove({"_id" : ObjectId("540feffe9fd57b955bd79b45")});
db.lugars.remove({"_id" : ObjectId("540fddd14937351d392e4d6e")});
db.eventos.remove({"_id" : ObjectId("540ff8e732377cc56c3ce113")});
db.eventos.remove({"_id" : ObjectId("540fddd24937351d392e4d6f")});
db.usuarios.insert({ "_id" : ObjectId("540fdd594937351d392e4d6b"),
    "email" : "pruebasprevia@example.com",
    "nombre" : "Juan Perez",
    "tipo_sangre" : "O-",
    "foto" : "",
    "ubicacion" : [ 2, 1 ],
    "hashed_password" : "weR4yda2C4HFQO2EwsvSxp5H4xTjbKkbJJOr2vsc3wzwpScDx6Pv6Fh++ddZZE92gI909ed7kOnh2t0H5RnS/g==",
    "salt" : "c+lYKaok7T8yweibXloJhg==",
    "donaciones_pendientes" : [ ],
    "donaciones_hechas" : [ ],
    "donaciones_pedidas" : [ ],
    "personas_extras" : [ { "nombre" : "Juanita Perez",
        "tipo_sangre" : "A+", "sexo" : "f",
        "_id" : ObjectId("540fddd14937351d392e4d6e") } ]
});
db.usuarios.insert({ "_id" : ObjectId("540fddd24937351d392e4d6f"),
    "email" : "paraborrar@example.com",
    "nombre" : "Juan Perez",
    "tipo_sangre" : "O-",
    "foto" : "",
    "ubicacion" : [ 2, 1 ],
    "hashed_password" : "weR4yda2C4HFQO2EwsvSxp5H4xTjbKkbJJOr2vsc3wzwpScDx6Pv6Fh++ddZZE92gI909ed7kOnh2t0H5RnS/g==",
    "salt" : "c+lYKaok7T8yweibXloJhg==",
    "donaciones_pendientes" : [ ],
    "donaciones_hechas" : [ ],
    "donaciones_pedidas" : [ ],
    "personas_extras" : [ { "nombre" : "Juanita Perez",
        "tipo_sangre" : "A+", "sexo" : "f",
        "_id" : ObjectId("540fddd14937351d392e4d6e") } ]
});

db.donacions.insert({ "_id" : ObjectId("540fddd24937351d392e4d6f"),
    "creado_por" : ObjectId("540fdd594937351d392e4d6b"),
    "tipo_sangre" : "O-",
    "lugar_donacion" : "cruzroja12312S",
    "donaciones_hechas" : [ ],
    "cantidad_confirmadas" : 0,
    "cantidad_pendientes" : 0,
    "cantidad_pedida" : 2,
    "estado" : "A",
    "fecha_solicitud" : ISODate("2014-09-10T05:12:50.048Z")
});
db.usuarios.update({"_id": ObjectId("540fdd594937351d392e4d6b")},
    {"$push": {"donaciones_pedidas":  ObjectId("540fddd24937351d392e4d6f")}
});
db.usuarios.update({"_id": ObjectId("540fdd594937351d392e4d6b")},
    {"$push": {"personas_extras": {
                    "nombre" : "Juanita Perez",
                    "tipo_sangre" : "A+",
                    "sexo" : "f",
                    "_id" : ObjectId("540fddd14937351d392e4d6e")
                    }
                }
});
db.lugars.insert({
    "_id" : ObjectId("540feffe9fd57b955bd79b45"),
    "nombre" : "Datos Iniciales",
    "fecha_agregado" : ISODate("2014-09-10T06:30:22.978Z")
});
db.lugars.insert({
    "_id" : ObjectId("540fddd14937351d392e4d6e"),
    "nombre" : "Para Borrar",
    "fecha_agregado" : ISODate("2014-09-10T06:30:22.978Z")
});
db.eventos.insert({
    "_id" : ObjectId("540ff8e732377cc56c3ce113"),
    "nombre" : "Una vida mejor",
    "descripcion" : "Campana en la autonama para donar",
    "fecha_inicio" : ISODate("2014-09-10T05:12:50.048Z"),
    "fecha_fin" : ISODate("2014-09-10T05:12:50.048Z"),
    "ubicacion" : [
        2,
        5
    ],
    "cantidad_donada" : 0,
    "estado" : "A"
});
db.eventos.insert({
    "_id" : ObjectId("540fddd24937351d392e4d6f"),
    "nombre" : "Para Borrar",
    "descripcion" : "Campana en la autonama para donar",
    "fecha_inicio" : ISODate("2014-09-10T05:12:50.048Z"),
    "fecha_fin" : ISODate("2014-09-10T05:12:50.048Z"),
    "ubicacion" : [
        2,
        5
    ],
    "cantidad_donada" : 0,
    "estado" : "A"
});
