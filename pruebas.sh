#!/bin/bash
###comandos de prueba

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
echo -e "Prueba agregar todos los usuarios"
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
echo "curl -i http://localhost:2222/usuario/540d373a042b800a5b1bd1fc"
echo "#############################################"
curl -i http://localhost:2222/usuario/540d373a042b800a5b1bd1fc
echo ""
##Actualiza un usuario
echo "#############################################"
echo -e "Prueba actualiza un usuario"
echo "#############################################"
echo "Comando"
echo "curl -i  -X PUT http://localhost:2222/usuario/540d373a042b800a5b1bd1fc -d ' { \"nombre\": \"Juan Mario Perez\" }'"
echo "#############################################"
curl -i  -X PUT http://localhost:2222/usuario/540d373a042b800a5b1bd1fc -d ' { "nombre": "Juan Jose Perez"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540d373a042b800a5b1bd1fc
echo ""
##Cambia la ubicacion del un usuario
echo "#############################################"
echo -e "Cambia la ubicacion del usuario"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/cambiar_ubicacion/540d373a042b800a5b1bd1fc -d ' { \"ubicacion\": [3,1] }'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/cambiar_ubicacion/540d373a042b800a5b1bd1fc -d ' { "ubicacion": [3,1] }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540d373a042b800a5b1bd1fc
echo ""
##Agrega persona extra
echo "#############################################"
echo -e "Agrega Persona Extra"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/agregar_persona_extra/540d373a042b800a5b1bd1fc -d ' { \"nombre\": \"Juanita Perez\", \"tipo_sangre\": \"A+\", \"sexo\": \"f\" }'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/agregar_persona_extra/540d373a042b800a5b1bd1fc -d ' { "nombre": "Juanita Perez", "tipo_sangre": "A+", "sexo": "f" }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540d373a042b800a5b1bd1fc
echo ""
##Modificar persona extra
echo "#############################################"
echo -e "Modificar Persona Extra"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/modificar_persona_extra/540d373a042b800a5b1bd1fc -d ' { \"_id\": \"540d2522021fc7d7412f468a\", \"nombre\": \"Maria Perez\", \"tipo_sangre\" : \"B-\"}'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/modificar_persona_extra/540d373a042b800a5b1bd1fc -d ' { "_id": "540d2522021fc7d7412f468a", "nombre": "Maria Perez", "tipo_sangre" : "B-"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540d373a042b800a5b1bd1fc
echo ""
##Borrar persona extra
echo "#############################################"
echo -e "Borrar Persona Extra"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/borrar_persona_extra/540d373a042b800a5b1bd1fc -d ' { \"_id\": \"540d2522021fc7d7412f468a\"}'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/borrar_persona_extra/540d373a042b800a5b1bd1fc -d ' { "_id": "540d2522021fc7d7412f468a"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540d373a042b800a5b1bd1fc
echo ""
# ##Borrar Usuario
# echo "#############################################"
# echo -e "Borrar Usuario"
# echo "#############################################"
# echo "Comando"
# echo "curl -i  -X POST http://localhost:2222/usuario/borrar_persona_extra/540d373a042b800a5b1bd1fc -d ' { \"_id\": \"540d2522021fc7d7412f468a\"}'"
# echo "#############################################"
# curl -i  -X DELETE http://localhost:2222/usuario/540d373a042b800a5b1bd1fc
# echo -e "\n###Documento cambiado###"
# curl -i http://localhost:2222/usuario/540d373a042b800a5b1bd1fc
# echo ""


#############################################
###########PRUEBAS DE DONACIONES###############
#############################################
##agrega un donacion
echo "#############################################"
echo -e "Prueba crear una donacion"
echo "#############################################"
echo "Comando"
echo "curl -i -X POST -d '{ \"creado_por\": \"540d373a042b800a5b1bd1fc\", \"cantidad_pedida\": \"2\", \"tipo_sangre\": \"O-\", \"lugar_donacion\": \"cruzroja12312S\" }' http://localhost:2222/donacion"
echo "#############################################"
curl -i -X POST -d '{ "creado_por": "540d373a042b800a5b1bd1fc", "cantidad_pedida": "2", "tipo_sangre": "O-", "lugar_donacion": "cruzroja12312S" }' http://localhost:2222/donacion
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
echo "curl -i http://localhost:2222/donacion/540d3a24af73b0cf62d502e1"
echo "#############################################"
curl -i http://localhost:2222/donacion/540d3a24af73b0cf62d502e1
echo ""
# ##Actualiza un donacion
echo "#############################################"
echo -e "Prueba actualizar un donacion"
echo "#############################################"
echo "Comando"
echo "curl -i  -X PUT http://localhost:2222/donacion/540d3a24af73b0cf62d502e1 -d ' { \"tipo_sangre\": \"B+\", \"lugar_donacion\": \"micasa\" }'"
echo "#############################################"
curl -i  -X PUT http://localhost:2222/donacion/540d3a24af73b0cf62d502e1 -d ' { "tipo_sangre": "B+", "lugar_donacion": "micasa" }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/donacion/540d3a24af73b0cf62d502e1
echo ""
##Cancela una donacion
echo "#############################################"
echo -e "Cancela una donacion"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/donacion/cancelar_donacion/540d373a042b800a5b1bd1fc"
echo "#############################################"
curl -i  -X POST http://localhost:2222/donacion/cancelar_donacion/540d3a24af73b0cf62d502e1
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/donacion/540d3a24af73b0cf62d502e1
echo ""
##Atender Solicitud Donacion
echo "#############################################"
echo -e "Atender Solicitud Donacion"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/donacion/atender_solicitud/540d3a24af73b0cf62d502e1 -d ' { \"hecha_por\": \"540d373a042b800a5b1bd1fc\" }'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/donacion/atender_solicitud/540d3a24af73b0cf62d502e1 -d ' { "hecha_por": "540d373a042b800a5b1bd1fc" }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/donacion/540d3a24af73b0cf62d502e1
echo ""
# ##Modificar persona extra
# echo "#############################################"
# echo -e "Modificar Persona Extra"
# echo "#############################################"
# echo "Comando"
# echo "curl -i  -X POST http://localhost:2222/donacion/modificar_persona_extra/540d373a042b800a5b1bd1fc -d ' { \"_id\": \"540d2522021fc7d7412f468a\", \"nombre\": \"Maria Perez\", \"tipo_sangre\" : \"B-\"}'"
# echo "#############################################"
# curl -i  -X POST http://localhost:2222/donacion/modificar_persona_extra/540d373a042b800a5b1bd1fc -d ' { "_id": "540d2522021fc7d7412f468a", "nombre": "Maria Perez", "tipo_sangre" : "B-"}'
# echo -e "\n###Documento cambiado###"
# curl -i http://localhost:2222/donacion/540d373a042b800a5b1bd1fc
# echo ""
# ##Borrar persona extra
# echo "#############################################"
# echo -e "Borrar Persona Extra"
# echo "#############################################"
# echo "Comando"
# echo "curl -i  -X POST http://localhost:2222/donacion/borrar_persona_extra/540d373a042b800a5b1bd1fc -d ' { \"_id\": \"540d2522021fc7d7412f468a\"}'"
# echo "#############################################"
# curl -i  -X POST http://localhost:2222/donacion/borrar_persona_extra/540d373a042b800a5b1bd1fc -d ' { "_id": "540d2522021fc7d7412f468a"}'
# echo -e "\n###Documento cambiado###"
# curl -i http://localhost:2222/donacion/540d373a042b800a5b1bd1fc
# echo ""
# ##Borrar donacion
# echo "#############################################"
# echo -e "Borrar donacion"
# echo "#############################################"
# echo "Comando"
# echo "curl -i  -X POST http://localhost:2222/donacion/borrar_persona_extra/540d373a042b800a5b1bd1fc -d ' { \"_id\": \"540d2522021fc7d7412f468a\"}'"
# echo "#############################################"
# curl -i  -X DELETE http://localhost:2222/donacion/540d373a042b800a5b1bd1fc
# echo -e "\n###Documento cambiado###"
# curl -i http://localhost:2222/donacion/540d373a042b800a5b1bd1fc
# echo ""

# ##
