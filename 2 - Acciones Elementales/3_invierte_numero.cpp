#include <iostream>

int invierte_numero( int numero ){ // digitos variables
   int aux{0};
   while(numero > 0){
      aux = aux*10 + numero%10; 
      numero = numero/10;
   }
   return aux;
}

int invierte_numero_fijo( int numero ){ // solo 4 digitos
  int aux{0};
   aux = numero%10;
   numero = numero/10;
   aux = aux * 10 + numero%10;
   numero = numero/10;
   aux = aux * 10 + numero%10;
   numero = numero/10;
   aux = aux * 10 + numero%10;
   return aux;
}

int main( int argc, char *argv[]){
   int numero{0};
   std::printf("Introduca un numero de 4 digitos\n");
   std::scanf("%d", &numero );
   //std::printf("est %d\n", 4538%10 );
   std::printf("%d\n", invierte_numero( numero ) );
   return 0;
}
