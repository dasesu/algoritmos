#include <iostream>
using namespace std;
  


long long partition(long long A[], long long start, long long end){
   long long pIndex = start;
   long long pivot = A[end];
   
   for (long long i = start; i < end; i++){
      if (A[i] <= pivot){
         swap(A[i], A[pIndex]);
         pIndex++;
      }
   }
   swap (A[pIndex], A[end]);
   return pIndex;
}
 


void quicksort(long long A[], long long start, long long end){
   if( start < end ){
      //int random = start + rand( )%(end-start +1 ) ;
      //swap ( A[random] , A[end]); //swap pivot with last element.
      long long pIndex = partition(A, start, end);
      quicksort(A, start, pIndex - 1);
      quicksort(A, pIndex + 1, end);
   }
}
 


int main( int argc, char *argv[] ){
   long long num{0};
   scanf("%lld\n", &num);

   long long A[num] = {}; // lo mismo que crear un for(int i=0;i<tam;i++){ A[i] = 0; }
   
   for( long long i=0; i<num; i++ ){
      scanf("%lld", &A[i]);
      //printf("%d ", A[i]);
   }
   
   quicksort( A, 0, num-1 );

   for( long long i=0; i<num; i++ ){
      printf("%lld ", A[i]);
   }


   return 0;
}
