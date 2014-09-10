#!/bin/bash
###comandos de prueba
PATH=/usr/bin/mongodb/bin:$PATH

mongo vida-dev "/home/jepz/Desarrollo/Servers/vida_server/initPruebaBd.js"
#############################################
###########PRUEBAS DE USUARIOS###############
#############################################
##busca todos los usuarios
echo "#############################################"
echo -e "Prueba busca todos los usuarios"
echo "#############################################"
echo "Comando"
echo "curl -i  http://localhost:2222/usuario"
echo "#############################################"
curl -i  http://localhost:2222/usuario
echo ""
##agrega un usuario
echo "#############################################"
echo -e "Prueba agregar un usuarios"
echo "#############################################"
echo "Comando"
echo "curl -i -X POST -d '{ \"email\": \"pruebas@example.com\", \"nombre\": \"Juan Perez\", \"tipo_sangre\": \"O-\", \"foto\": \"\", \"ubicacion\": [2,1], \"password\": \"clave\"  }' http://localhost:2222/usuario"
echo "#############################################"
curl -i -X POST -d '{ "email": "pruebas@example.com", "nombre": "Juan Perez", "tipo_sangre": "O-", "foto": "", "ubicacion": [2,1], "password": "paraque" }' http://localhost:2222/usuario
echo ""
##busca un usuario
echo "#############################################"
echo -e "Prueba muestra un solo usuario"
echo "#############################################"
echo "Comando"
echo "curl -i http://localhost:2222/usuario/540fdd594937351d392e4d6b"
echo "#############################################"
curl -i http://localhost:2222/usuario/540fdd594937351d392e4d6b
echo ""
##Actualiza un usuario
echo "#############################################"
echo -e "Prueba actualiza un usuario"
echo "#############################################"
echo "Comando"
echo "curl -i  -X PUT http://localhost:2222/usuario/540fdd594937351d392e4d6b -d ' { \"nombre\": \"Juan Mario Perez\" }'"
echo "#############################################"
curl -i  -X PUT http://localhost:2222/usuario/540fdd594937351d392e4d6b -d ' { "nombre": "Juan Jose Perez"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540fdd594937351d392e4d6b
echo ""
##Cambia la ubicacion del un usuario
echo "#############################################"
echo -e "Cambia la ubicacion del usuario"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/cambiar_ubicacion/540fdd594937351d392e4d6b -d ' { \"ubicacion\": [3,1] }'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/cambiar_ubicacion/540fdd594937351d392e4d6b -d ' { "ubicacion": [3,1] }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540fdd594937351d392e4d6b
echo ""
##Agrega persona extra
echo "#############################################"
echo -e "Agrega Persona Extra"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/agregar_persona_extra/540fdd594937351d392e4d6b -d ' { \"nombre\": \"Juanita Perez\", \"tipo_sangre\": \"A+\", \"sexo\": \"f\" }'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/agregar_persona_extra/540fdd594937351d392e4d6b -d ' { "nombre": "Juanita Perez", "tipo_sangre": "A+", "sexo": "f" }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540fdd594937351d392e4d6b
echo ""
##Modificar persona extra
echo "#############################################"
echo -e "Modificar Persona Extra"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/modificar_persona_extra/540fdd594937351d392e4d6b -d ' { \"_id\": \"540d2522021fc7d7412f468a\", \"nombre\": \"Maria Perez\", \"tipo_sangre\" : \"B-\"}'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/modificar_persona_extra/540fdd594937351d392e4d6b -d ' { "_id": "540fddd14937351d392e4d6e", "nombre": "Maria Perez", "tipo_sangre" : "B-"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540fdd594937351d392e4d6b
echo ""
##Borrar persona extra
echo "#############################################"
echo -e "Borrar Persona Extra"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/borrar_persona_extra/540fdd594937351d392e4d6b -d ' { \"_id\": \"540d2522021fc7d7412f468a\"}'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/borrar_persona_extra/540fdd594937351d392e4d6b -d ' { "_id": "540fddd14937351d392e4d6e"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540fdd594937351d392e4d6b
echo ""
##Borrar Usuario
echo "#############################################"
echo -e "Borrar Usuario"
echo "#############################################"
echo "Comando"
echo "curl -i  -X DELETE http://localhost:2222/usuario/540fddd24937351d392e4d6f"
echo "#############################################"
curl -i  -X DELETE http://localhost:2222/usuario/540fddd24937351d392e4d6f
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540fddd24937351d392e4d6f
echo ""


#############################################
###########PRUEBAS DE DONACIONES###############
#############################################
##agrega un donacion
echo "#############################################"
echo -e "Prueba crear una donacion"
echo "#############################################"
echo "Comando"
echo "curl -i -X POST -d '{ \"creado_por\": \"540fdd594937351d392e4d6b\", \"cantidad_pedida\": \"2\", \"tipo_sangre\": \"O-\", \"lugar_donacion\": \"cruzroja12312S\" }' http://localhost:2222/donacion"
echo "#############################################"
curl -i -X POST -d '{ "creado_por": "540fdd594937351d392e4d6b", "cantidad_pedida": "2", "tipo_sangre": "O-", "lugar_donacion": "cruzroja12312S" }' http://localhost:2222/donacion
echo ""
##buscar todas las donaciones donacion
echo "#############################################"
echo -e "Prueba buscar donaciones"
echo "#############################################"

echo "Comando"
echo "curl -i  http://localhost:2222/donacion"
echo "#############################################"
curl -i  http://localhost:2222/donacion
echo ""
##busca un donacion
echo "#############################################"
echo -e "Prueba muestra un solo donacion"
echo "#############################################"
echo "Comando"
echo "curl -i http://localhost:2222/donacion/540fddd24937351d392e4d6f"
echo "#############################################"
curl -i http://localhost:2222/donacion/540fddd24937351d392e4d6f
echo ""
# ##Actualiza un donacion
echo "#############################################"
echo -e "Prueba actualizar un donacion"
echo "#############################################"
echo "Comando"
echo "curl -i  -X PUT http://localhost:2222/donacion/540fddd24937351d392e4d6f -d ' { \"tipo_sangre\": \"B+\", \"lugar_donacion\": \"micasa\" }'"
echo "#############################################"
curl -i  -X PUT http://localhost:2222/donacion/540fddd24937351d392e4d6f -d ' { "tipo_sangre": "B+", "lugar_donacion": "micasa" }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/donacion/540fddd24937351d392e4d6f
echo ""
##Cancela una donacion
echo "#############################################"
echo -e "Cancela una donacion"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/donacion/cancelar_donacion/540fdd594937351d392e4d6b"
echo "#############################################"
curl -i  -X POST http://localhost:2222/donacion/cancelar_donacion/540fddd24937351d392e4d6f
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/donacion/540fddd24937351d392e4d6f
echo ""
##Atender Solicitud Donacion
echo "#############################################"
echo -e "Atender Solicitud Donacion"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/donacion/atender_solicitud/540fddd24937351d392e4d6f -d ' { \"hecha_por\": \"540fdd594937351d392e4d6b\" }'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/donacion/atender_solicitud/540fddd24937351d392e4d6f -d ' { "hecha_por": "540fdd594937351d392e4d6b" }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/donacion/540fddd24937351d392e4d6f
echo -e "\n###Documento cambiado(Usuario)###"
curl -i http://localhost:2222/usuario/540fdd594937351d392e4d6b
echo ""
##Confirmar Donacion
echo "#############################################"
echo -e "Confirmar Donacion"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/donacion/confirmar_donacion/540fddd24937351d392e4d6f -d ' { \"hecha_por\": \"540fdd594937351d392e4d6b\" }'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/donacion/confirmar_donacion/540fddd24937351d392e4d6f -d ' { "hecha_por": "540fdd594937351d392e4d6b" }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/donacion/540fddd24937351d392e4d6f
echo -e "\n###Documento cambiado(Usuario)###"
curl -i http://localhost:2222/usuario/540fdd594937351d392e4d6b
echo ""

#############################################
###########PRUEBAS DE LUGARES###############
#############################################
##busca todos los lugares
echo "#############################################"
echo -e "Prueba busca todos los lugares"
echo "#############################################"
echo "Comando"
echo "curl -i  http://localhost:2222/lugar"
echo "#############################################"
curl -i  http://localhost:2222/lugar
echo ""
##agrega un lugar
echo "#############################################"
echo -e "Prueba agregar un lugares"
echo "#############################################"
echo "Comando"
echo "curl -i -X POST -d '{ \"nombre\": \"Mi casa\", \"ubicacion\": [2,1] }' http://localhost:2222/lugar"
echo "#############################################"
curl -i -X POST -d '{ "nombre": "Mi casa", "ubicacion": [2,1] }' http://localhost:2222/lugar
echo ""
##busca un lugar
echo "#############################################"
echo -e "Prueba muestra un solo lugar"
echo "#############################################"
echo "Comando"
echo "curl -i http://localhost:2222/lugar/540ff8e732377cc56c3ce113"
echo "#############################################"
curl -i http://localhost:2222/lugar/540ff8e732377cc56c3ce113
echo ""
##Actualiza un lugar
echo "#############################################"
echo -e "Prueba actualiza un lugar"
echo "#############################################"
echo "Comando"
echo "curl -i  -X PUT http://localhost:2222/lugar/540ff8e732377cc56c3ce113 -d ' { \"nombre\": \"Tu Apa\" }'"
echo "#############################################"
curl -i  -X PUT http://localhost:2222/lugar/540ff8e732377cc56c3ce113 -d ' { "nombre": "Tu Apa"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/lugar/540ff8e732377cc56c3ce113
echo ""
##Cancelar el evento
echo "#############################################"
echo -e "Cambia la ubicacion del lugar"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/lugar/cambiar_ubicacion/540ff8e732377cc56c3ce113 -d ' { \"ubicacion\": [10,20] }'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/lugar/cambiar_ubicacion/540ff8e732377cc56c3ce113 -d ' { "ubicacion": [10,20] }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/lugar/540ff8e732377cc56c3ce113
echo ""
##Borrar lugar
echo "#############################################"
echo -e "Borrar lugar"
echo "#############################################"
echo "Comando"
echo "curl -i  -X DELETE http://localhost:2222/lugar/540fddd24937351d392e4d6f"
echo "#############################################"
curl -i  -X DELETE http://localhost:2222/lugar/540fddd24937351d392e4d6f
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/lugar/540fddd24937351d392e4d6f
echo ""


#############################################
###########PRUEBAS DE EVENTOS###############
#############################################
##busca todos los eventos
echo "#############################################"
echo -e "Prueba busca todos los eventos"
echo "#############################################"
echo "Comando"
echo "curl -i  http://localhost:2222/evento"
echo "#############################################"
curl -i  http://localhost:2222/evento
echo ""
##agrega un evento
echo "#############################################"
echo -e "Prueba agregar un eventos"
echo "#############################################"
echo "Comando"
echo "curl -i -X POST -d '{ \"nombre\": \"Una vida mejor\", \"descripcion\": \"Campana en la autonama para donar\", \"fecha_inicio\": \"12-12-2012\", \"fecha_fin\": \"13-12-2012\", \"ubicacion\": [2,5]}' http://localhost:2222/evento"
echo "#############################################"
curl -i -X POST -d '{ "nombre": "Una vida mejor", "descripcion": "Campana en la autonama para donar", "fecha_inicio": "2014-09-10T05:12:50.048Z", "fecha_fin": "2014-09-10T05:12:50.048Z", "ubicacion": [2,5]}' http://localhost:2222/evento
echo ""
##busca un evento
echo "#############################################"
echo -e "Prueba muestra un solo evento"
echo "#############################################"
echo "Comando"
echo "curl -i http://localhost:2222/evento/540ff8e732377cc56c3ce113"
echo "#############################################"
curl -i http://localhost:2222/evento/540ff8e732377cc56c3ce113
echo ""
##Actualiza un evento
echo "#############################################"
echo -e "Prueba actualiza un evento"
echo "#############################################"
echo "Comando"
echo "curl -i  -X PUT http://localhost:2222/evento/540ff8e732377cc56c3ce113 -d ' { \"nombre\": \"Una vida MAS mejor\" }'"
echo "#############################################"
curl -i  -X PUT http://localhost:2222/evento/540ff8e732377cc56c3ce113 -d ' { "nombre": "Una vida MAS mejor"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/evento/540ff8e732377cc56c3ce113
echo ""
##Cancelar el Evento
echo "#############################################"
echo -e "Cancelar el Evento"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/evento/cancelar_evento/540ff8e732377cc56c3ce113"
echo "#############################################"
curl -i  -X POST http://localhost:2222/evento/cancelar_evento/540ff8e732377cc56c3ce113
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/evento/540ff8e732377cc56c3ce113
echo ""
##Borrar evento
echo "#############################################"
echo -e "Borrar evento"
echo "#############################################"
echo "Comando"
echo "curl -i  -X DELETE http://localhost:2222/evento/540fddd24937351d392e4d6f"
echo "#############################################"
curl -i  -X DELETE http://localhost:2222/evento/540fddd24937351d392e4d6f
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/evento/540fddd24937351d392e4d6f
echo ""
