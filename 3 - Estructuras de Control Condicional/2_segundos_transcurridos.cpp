#include <iostream>
#include <string>

int main(int argc, char *argv[]){
   int hora{0};
   std::cout << "Introduzca la hora: ";
   std::cin >> hora;
   if( hora < 1 || hora > 12)
      exit(1);
   int minuto{0};
   std::cout << "Introduzca los minutos: ";
   std::cin >> minuto;
   if( minuto < 0 || minuto > 59 )
      exit(1);
   int segundo{0};
   std::cout << "Introduzca los segundos: ";
   std::cin >> segundo;
   if( segundo < 0 || segundo > 59 )
      exit(1);
   std::string turno{""};
   std::cout << "Indique si es am o pm: ";
   std::cin >> turno;
   if( (turno != "am") && (turno != "pm") )
      exit(1);
   
   std::cout << "A las " << hora << ':' << minuto << ':' << segundo << ' ' << turno << ' ';
   int segundos_totales{0};
   segundos_totales = segundos_totales + hora*3600;
   segundos_totales = segundos_totales + minuto*60;
   segundos_totales = segundos_totales + segundo;
   if( turno == "pm" )
      segundos_totales = segundos_totales + 12*3600;
   std::cout << "han transcurrido " << segundos_totales << " segundo\n";
      
   return 0;
}
