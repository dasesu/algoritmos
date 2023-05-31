#include <iostream>
#include <iomanip>

int main(int argc, char *argv[]){
   int numero{1};
   int cant_impares{0};
   int impares{0};
   int cant_pares{0};
   int pares{0};

   while(numero!=0){
      std::cout << "Introduzca un numero: ";
      std::cin >> numero;
      if( numero != 0){
         if( numero%2 == 1 ){
            impares = impares + numero; 
            cant_impares++;
         }else{
            pares = pares + numero; 
            cant_pares++;
         }
      }
   }
   int cant_numeros{ cant_pares + cant_impares };
   
   float porcentaje_impares{0.0};
   porcentaje_impares = cant_impares/static_cast<float>(cant_numeros)*100;
   std::cout << "Porcentaje de impares es: ";
   std::cout << std::fixed << std::setprecision(1) << porcentaje_impares << "%\n";
   std::cout << "Cantidad de impares es: ";
   std::cout << std::fixed << std::setprecision(1) << cant_impares << '\n';
   std::cout << "Suma de los valores impares es: ";
   std::cout << std::fixed << std::setprecision(1) << impares << '\n';
 
   float porcentaje_pares{0.0};
   porcentaje_pares = cant_pares/static_cast<float>(cant_numeros)*100;
   std::cout << "Porcentaje de pares es: ";
   std::cout << std::fixed << std::setprecision(1) << porcentaje_pares << "%\n";
   std::cout << "Cantidad de pares es: ";
   std::cout << std::fixed << std::setprecision(1) << cant_pares << '\n';
   std::cout << "Suma de los valores pares es: ";
   std::cout << std::fixed << std::setprecision(1) << pares << '\n';

   return 0;
}
