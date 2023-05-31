#include <iostream>

int main( int argc, char *argv[]){
   int num{0};
   std::cout << "Introduzca un numero \n";
   std::cin >> num;

   int aux{0};
   int ref{0};
   
   aux=num;
   while( aux > 0 ){
      ref = ref*10 + aux%10;
      aux = aux/10;
   }

   if(num == ref)
      std::cout << "Capicua\n";
   else
      std::cout << "No lo es\n";

   return 0;
}
