#include <iostream>
#include <iomanip>
#include <cmath>

int main( int argc, char *argv[]){
   float cat1{0.0}; 
   float cat2{0.0}; 

   //std::printf("Introduzca cateto 1: ");  
   //std::scanf("%f", &cat1);
   std::cout << "Introduzca cateto 1: ";
   std::cin >> cat1; 

   //std::printf("Introduzca cateto 2: ");
   //std::scanf("%f", &cat1);
   std::cout << "Introduzca cateto 2: ";
   std::cin >> cat2;    

   // el cuadrado de la hipotenusa es igual a la suma del cuadrado de los catetos
   float hipotenusa{0.0};
   
   hipotenusa = std::pow( cat1, 2) + std::pow( cat2, 2);
   hipotenusa = std::sqrt( hipotenusa );
   //std::printf("La hipotenusa es: %.2f", hipotenusa);
   std::cout << "La hipotenusa es: " << std::fixed << std::setprecision(2) << hipotenusa << '\n';

   return 0;
}
