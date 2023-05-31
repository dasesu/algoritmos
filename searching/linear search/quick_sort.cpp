#include <iostream>
using namespace std;
  


int partition(int A[], int start, int end){
   int pIndex = start;
   int pivot = A[end];

   for (int i = start; i < end; i++){
      if (A[i] <= pivot){
         swap(A[i], A[pIndex]);
         pIndex++;
      }
   }
   swap (A[pIndex], A[end]);
   return pIndex;
}
 


void quicksort(int A[], int start, int end){
   if( start < end ){
      int random = start + rand( )%(end-start +1 ) ;
      swap ( A[random] , A[end]); //swap pivot with last element.
      int pIndex = partition(A, start, end);
      quicksort(A, start, pIndex - 1);
      quicksort(A, pIndex + 1, end);
   }
}
 


int main() {
   FILE *fp;
   int val{0};
   int tam{1000000};  // int n = sizeof(A)/sizeof(A[0]);
   int A[tam] = {}; // lo mismo que crear un for(int i=0;i<tam;i++){ A[i] = 0; }
   fp = fopen("file.txt", "r");
   int i{0};

   while (i < tam) {
      fscanf(fp, "%d\n", &val);
      A[i] = val;
      i++;
   }
   fclose(fp);

   quicksort(A, 0, tam-1 );

   fp = fopen("output.txt", "w");
   i = 0;
   while (i < tam) {
      fprintf(fp, "%d\n", A[i]);
      i++;
   }
   fclose(fp);

  return 0;
}