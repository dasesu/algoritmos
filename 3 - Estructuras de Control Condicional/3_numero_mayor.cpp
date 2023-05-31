#include <iostream>

float mayor( int A, int B){
   if( A >= B )
      return A;
   return B;
}

int main( int argc, char *argv[]){
   float numA{0.0};
   float numB{0.0};

   std::cout << "Introduzca un numero: \n";
   std::cin >> numA;
   std::cout << "Introduzca otro numero: \n";
   std::cin >> numB;

   std::cout << mayor(numA, numB) << "\n";
   return 0;
}
