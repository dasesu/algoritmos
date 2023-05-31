#include <iostream>
#include <cmath>

int main(int argc, char *argv[]){
   //bool b = true;
   //int i = 1;
   //int j = 2;
   //std::printf("%d", b && i + j );
   //std::printf("%d", ( j*5%3 ) );
   //std::printf("%d", ( (b && i + j) == (j*5%3) )  );

   int a{3};
   int b{4};
   bool c{true};
   //std::printf("%d\n", (a*2 > b) );
   //std::printf("%d\n", (a*2 > b) && c );

   //std::printf("%d\n", b/2 - 4*a*b/1/2);

   std::printf("%d\n", b/2 );
   std::printf("%d\n", 4*a*b );
   std::printf("%d\n", b/2-4 );
   std::printf("%d\n", b/2-4*a );
   std::printf("%d\n", b/2-4*a*b );
   std::printf("%.2f\n", std::pow(b/2-4*a*b,1/2) ); // raiz cuadrada de numero negativo
   std::printf("%f\n", std::pow(b/2-4*a*b,1/2) ); // raiz cuadrada de numero negativo

   std::printf("%f\n", std::pow(b/(2-4*a)*b,1/2) ); // raiz cuadrada de numero negativo
                                                  //
   return 0;
}
