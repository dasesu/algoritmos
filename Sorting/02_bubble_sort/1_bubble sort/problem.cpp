#include <cstdio>

int main( int argc, char *argv[] ){
   int num{0};
   //int A[10] = {0,0,0,0,0,0,0,0,0,0 };
   scanf("%d", &num);
   int A[num] = {}; // lo mismo que crear un for(int i=0;i<tam;i++){ A[i] = 0; }
   int temp{0};
   for( int i=0; i<num; i++ ){
      scanf("%d", &A[i]);
      //printf("%d ", A[i]);
   }
   int aux{0};
   int contador{0};
   for( int k=0; k<num-1; k++ ){
      for( int i=0;i<num-k-1;i++ ){
         if( A[i] > A[i+1] ){
            aux=A[i];
            A[i] = A[i+1];
            A[i+1] = aux;
            contador++;
         }
      }
   }
   printf("%d\n", contador );
   return 0;
}
