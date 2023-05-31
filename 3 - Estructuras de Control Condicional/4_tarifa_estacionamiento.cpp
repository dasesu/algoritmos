#include <iostream>

int main(int argc, char *argv[]){

   int hora_in{0};
   std::cout << "Introduzca la hora de entrada: ";
   std::cin >> hora_in;
   int minuto_in{0};
   std::cout << "Introduzca los minutos de entrada: ";
   std::cin >> minuto_in;

   int hora_out{0};
   std::cout << "Introduzca la hora de salida: ";
   std::cin >> hora_out;
   int minuto_out{0};
   std::cout << "Introduzca los minutos de salida: ";
   std::cin >> minuto_out;

   int entrada{0};
   entrada = entrada + hora_in*60;
   entrada = entrada + minuto_in;

   int salida{0};
   salida = salida + hora_out*60;
   salida = salida + minuto_out;

   int cant_horas{0};
   cant_horas = (salida - entrada)/60;

   int cant_fraccion{0};
   cant_fraccion = (salida - entrada)%60; 

   std::cout << cant_horas << '\n';
   std::cout << cant_fraccion << '\n';
   int monto{0};

   if( cant_horas == 0 && cant_fraccion > 0 ){
      monto = 100;
   }else if( cant_horas > 0 && cant_fraccion > 0 ){
      monto = 100 + (cant_horas-1)*80;
      monto = monto + 80;
   }else{
      monto = 100 + (cant_horas-1)*80;
   }

   std::cout << "El monto es: " << monto << '\n';
   return 0;
}

