#include <iostream>

int main( int argc, char *argv[] ){
   int numero{0};
   std::cout << "Introduzca un numero del que se desea\n";
   std::cout << "conocer los digitos\n";
   std::cin >> numero;
   int aux{0};
   aux = numero;
   int digitos{0};
   while( aux > 0 ){
      aux=aux/10;
      ++digitos;
   }
   std::cout << digitos << '\n';

   return 0;
}
