#include <iostream>

int main(){
   int borde{0};
   printf("Introduzca el tamano del borde: ");
   scanf("%d", &borde );

   for( int j=0;j<borde;j++){
      if( j!=0 && j!=borde-1 ){
         for( int i=0;i<borde; i++){
            if(i==0 || i==borde-1){
               printf("#");
            }else{
               printf(" ");
            }
         }
      }else{
         for( int i=0;i<borde; i++){
            printf("#");
         }
      }
      printf("\n");
   }

   return 0;
}
