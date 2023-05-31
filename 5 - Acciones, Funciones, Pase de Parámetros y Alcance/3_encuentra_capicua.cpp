#include <iostream>


int capicua(int number){
   int aux{0};
   int ref{0};
   aux=number;
   while( aux > 0 ){
      ref = ref*10 + aux%10;
      aux = aux/10;
   }
   if(number == ref){
      printf("%d\n", number );
      return number;
   }else{
      return -1;
   }
}

int picaporciones(){
   int number{797454797};
   int digitos{3};
   int factor{1};
   for(int i=0; i<digitos; i++ ){
      factor = factor*10;
   }
   while( number >= factor/10 ){
      capicua( number%factor );
      number = number/10;
   }
   return 0;
}

int find_capicua( ){
   picaporciones();
   return 0;
}

int main( int argc, char *argv[] ){
   find_capicua();
   return 0;
}
