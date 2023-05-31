#include <cstdio>
#include <cstdlib>
#include <iostream>
#include <math.h>
#include <iomanip>


int main( int argc, char *argv[] ){
   int a{0}; //
   int b{0}; //
   int c{0}; //

   if(argc > 1){ // argv[0]: nombre del programa, argv[1]: primer parametro etc.
      // tomar los coeficientes de la entrada argv 
      if(argc > 1 && argc < 4){  // si tengo mas coeficientes tomo solo los primeros 3
         //std::printf("Falta informacion: introducir coeficientes del polinomio\n");
         std::cout << "Falta informacion: introducir coeficientes del polinomio\n";
         exit(1);
      }  
      a = atoi( argv[1] );
      b = atoi( argv[2] );
      c = atoi( argv[3] );
      if(a==0){
         std::cout << "Primer coeficiente debe ser distinto de cero";
         exit(1);
      }

   }else{
      // preguntar los coeficientes
      //std::printf("Introduzca primer coeficiente: ");
      //std::scanf("%d", &a );
      std::cout << "Introduzca primer coeficiente: ";
      std::cin >> a;
      if(a==0){
         //std::printf("Primer coeficiente debe ser distinto de cero");
         std::cout << "Primer coeficiente debe ser distinto de cero";
         exit(1);
      }
      //std::printf("Introduzca segundo coeficiente: ");
      //scanf("%d", &b );
      std::cout << "Introduzca segundo coeficiente: ";
      std::cin >> b;

      //std::printf("Introduzca tercer coeficiente: ");
      std::cout << "Introduzca tercer coeficiente: ";
      //scanf("%d", &c );
      std::cin >> c;
   }
   
   float aux{0.0};   
   float x1{0.0};
   float x2{0.0};
   // std::printf("%.2f\n", std::sqrt(b) );
   // std::printf("%.2f\n", std::pow(b, 2) );
   aux =  std::pow(b,2)-4*(a*c);
   if(aux<0){
      float partreal{0.0};
      float partimg{0.0};
      partreal = -1*b;
      partimg=std::sqrt(-1*aux);
      std::cout  << "x1 = (" << partreal << " + " << std::setprecision(2) << partimg << "i )/" << 2*a <<  '\n';
      std::cout  << "x2 = (" << partreal << " - " << std::setprecision(2) << partimg << "i )/" << 2*a <<  '\n';
   }else{
      x1 = (-1*b) + std::sqrt(aux);
      x1 = x1/(2*a);
      std::cout  << "x1 = " << std::setprecision(2) << x1 << '\n';

      x2 = (-1*b) - std::sqrt(aux);
      x2 = x2/(2*a);
      std::cout  << "x2 = " << std::setprecision(2) << x2 << '\n';

   }
   return 0;
}
