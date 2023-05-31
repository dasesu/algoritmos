#include <iostream>
#include <cstdio>
#include <string>
#include <cmath>

int main( int argc, char *argv[]){
   std::string binario{""};             
   std::printf("Introduzca un numero binario: ");
	std::getline( std::cin >> std::ws, binario );
   int binsize{ static_cast<int>( binario.length() ) }; // cantidad de caracteres

   int decimal{0};
   int i=0;

   for(i=0;i<binsize;i++){
      //printf("%c\n", binario[binsize-i-1] );
      if( binario[binsize-i-1] == '1' ){
         decimal = decimal + static_cast<int>( std::pow(2,i) );
         //printf("%d\n", decimal );
      }
   }
   std::printf("%s => %d\n", binario.c_str(), decimal );

   return 0;
}
