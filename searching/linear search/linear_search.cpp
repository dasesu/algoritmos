#include <iostream>


int main( int argc, char *argv[]){
   FILE *fp;
   int tam{1000000};
   int A[tam] = {}; // lo mismo que crear un for(int i=0;i<tam;i++){ A[i] = 0; }
   int val{0};
   fp = fopen("output.txt", "r");
   int i{0};
   while (i < tam) {
      fscanf(fp, "%d\n", &val);
      A[i] = val;
      i++;
   }
   fclose(fp);
   int buscar{111};
   i = 0;
   while (i < tam) {
      
      if( A[i] == buscar ){
         printf("El elemento %d esta en la posicion %d\n", buscar, i);
      }
      i++;      
   }
}
