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
echo "curl -i http://localhost:2222/usuario/540cf938fec5a566244c23f8"
echo "#############################################"
curl -i http://localhost:2222/usuario/540cf938fec5a566244c23f8
echo ""
##Actualiza un usuario
echo "#############################################"
echo -e "Prueba actualiza un usuario"
echo "#############################################"
echo "Comando"
echo "curl -i  -X PUT http://localhost:2222/usuario/540cf938fec5a566244c23f8 -d ' { \"nombre\": \"Juan Mario Perez\" }'"
echo "#############################################"
curl -i  -X PUT http://localhost:2222/usuario/540cf938fec5a566244c23f8 -d ' { "nombre": "Juan Jose Perez"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540cf938fec5a566244c23f8
echo ""
##Cambia la ubicacion del un usuario
echo "#############################################"
echo -e "Cambia la ubicacion del usuario"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/cambiar_ubicacion/540cf938fec5a566244c23f8 -d ' { \"ubicacion\": [3,1] }'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/cambiar_ubicacion/540cf938fec5a566244c23f8 -d ' { "ubicacion": [3,1] }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540cf938fec5a566244c23f8
echo ""
##Agrega persona extra
echo "#############################################"
echo -e "Agrega Persona Extra"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/agregar_persona_extra/540cf938fec5a566244c23f8 -d ' { \"nombre\": \"Juanita Perez\", \"tipo_sangre\": \"A+\", \"sexo\": \"f\" }'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/agregar_persona_extra/540cf938fec5a566244c23f8 -d ' { "nombre": "Juanita Perez", "tipo_sangre": "A+", "sexo": "f" }'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540cf938fec5a566244c23f8
echo ""
##Modificar persona extra
echo "#############################################"
echo -e "Modificar Persona Extra"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/modificar_persona_extra/540cf938fec5a566244c23f8 -d ' { \"_id\": \"540d2522021fc7d7412f468a\", \"nombre\": \"Maria Perez\", \"tipo_sangre\" : \"B-\"}'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/modificar_persona_extra/540cf938fec5a566244c23f8 -d ' { "_id": "540d2522021fc7d7412f468a", "nombre": "Maria Perez", "tipo_sangre" : "B-"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540cf938fec5a566244c23f8
echo ""
##Borrar persona extra
echo "#############################################"
echo -e "Borrar Persona Extra"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/borrar_persona_extra/540cf938fec5a566244c23f8 -d ' { \"_id\": \"540d2522021fc7d7412f468a\"}'"
echo "#############################################"
curl -i  -X POST http://localhost:2222/usuario/borrar_persona_extra/540cf938fec5a566244c23f8 -d ' { "_id": "540d2522021fc7d7412f468a"}'
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540cf938fec5a566244c23f8
echo ""
##Borrar Usuario
echo "#############################################"
echo -e "Borrar Usuario"
echo "#############################################"
echo "Comando"
echo "curl -i  -X POST http://localhost:2222/usuario/borrar_persona_extra/540cf938fec5a566244c23f8 -d ' { \"_id\": \"540d2522021fc7d7412f468a\"}'"
echo "#############################################"
curl -i  -X DELETE http://localhost:2222/usuario/540cf938fec5a566244c23f8
echo -e "\n###Documento cambiado###"
curl -i http://localhost:2222/usuario/540cf938fec5a566244c23f8
echo ""
   #  server.del('/usuario/:id', usuarios.destroy);

##
