#include <iostream>

int main( int argc, char *argv[]){
   int hora{0};
   int minutos{0};

   std::cout << "Introduzca la hora\n";
   std::cin >> hora; 

   if( hora < 1 || hora > 12 )
      exit(1);

   std::cout << "Introduzca los minutos\n";
   std::cin >> minutos; 

   if( minutos < 0 || minutos > 59 )
      exit(1);

   int angulo_minutos{0}; 
   angulo_minutos = minutos*6;

   float angulo_hora{0};
   angulo_hora = hora*30 + static_cast<float>(minutos)/2;
   
   if ( (angulo_hora >= angulo_minutos) && (angulo_hora - angulo_minutos) <=180 ){
      std::cout <<  (angulo_hora - angulo_minutos) << "\n"; 
   }else if( (angulo_hora >= angulo_minutos) && (angulo_hora - angulo_minutos) > 180  ){
      std::cout <<  360 - (angulo_hora - angulo_minutos) << "\n"; 
   }else if( (angulo_hora < angulo_minutos) && (angulo_minutos - angulo_hora) < 180 ){
      std::cout <<  (angulo_minutos - angulo_hora ) << "\n"; 
   }else if( (angulo_hora < angulo_minutos) && (angulo_minutos - angulo_hora) > 180 ){
      std::cout << 360 - (angulo_minutos - angulo_hora ) << "\n"; 
   }
   return 0;

}
