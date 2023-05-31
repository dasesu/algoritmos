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

   int B[num];
   for(int i=0;i<num;i++){ B[i] = i; }
//   for( int i=0; i<num; i++ ){
//      printf("%d ", A[i]);
//   }

   for( int i = 0 ;i < num ; i++ ) {
      int temp = A[ i ];    
      int tempB = B[i];
      int j = i;
      while(  j > 0  && temp < A[j-1] ) {
         A[j] = A[j-1];   
         B[j] = B[j-1];
         j=j-1;
      }
      A[j] = temp;
      B[j] = tempB;
   }

   int SS[num] = {};
//   printf("\n");
   for( int i=0; i<num; i++ ){
      SS[ B[i] ] = i;
   }
   for( int i=0; i<num; i++ ){
      printf("%d ", SS[i]+1);
   }

   return 0;
}
