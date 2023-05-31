#include <iostream>


int extraer_digitos2(int numero, int digitos){
   int aux{numero}; 
   int result{0};
   int cantidad{0};
   while( numero > 0 ){
      numero = numero/10;
      cantidad++;
   }
   numero = aux;
   aux = 1;
   if( cantidad >= digitos ){
      for(int i=0; i < cantidad-digitos ;i++){
         aux = aux*10;
      }
      result = numero/aux;
   }else{
      printf("La cantidad de digitos supera el tama;o del numero introducido\n");
      return -1;
   }
   return result;
}


int extraer_digitos( int numero, int digitos ){
   int aux{numero}; 
   int result{0};
   int factor{1};
   for(int i=0; i<digitos; i++ ){
      factor = factor*10;
   }
   while( numero >= factor/10  ){
      result = numero%factor;
      numero = numero/10;
   }
   return result;
}

int main( int argc, char *argv[] ){
   int numero{0};
   int digitos{0};
   printf("Introduzca un numero: ");
   scanf("%d", &numero );
   printf("Introduzca cuantos digitos: ");
   scanf("%d", &digitos );

   printf("%d\n", extraer_digitos( numero, digitos ) ); 

   return 0;
}
