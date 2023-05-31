#include <iostream>
using namespace std;
  

void merge(int A[], int l, int m, int r){
   int i, j, k;
   int n1 = m - l + 1;
   int n2 =  r - m;

   /* create temp Arrays */
   int L[n1], R[n2];

   // insert data into L
   for( i = 0; i < n1; i++){
      L[i] = A[l + i];
   }

   // insert data into R
   for (j = 0; j < n2; j++){
      R[j] = A[m + 1 + j]; 
   }

   // Merge L and R and ordered
   i = 0;
   j = 0;
   k = l;
   while (i < n1 && j < n2){
      if (L[i] <= R[j]){
         A[k] = L[i];
         i++;
      }else{
         A[k] = R[j];
         j++;
      }
      k++;
   }

   // copy the left of L if remains 
   while (i < n1){
      A[k] = L[i];
      i++;
      k++;
   }

   // copy the left of R if remains
   while (j < n2){
      A[k] = R[j];
      j++;
      k++;
   }
}

int min(int x, int y){
   return (x<y)?x:y; 
}

void merge_sort_iterativo(int A[], int n){
   int curr_size;
   int left_start;
   for (curr_size=1; curr_size < n; curr_size = 2*curr_size){
      for (left_start=0; left_start<n-1; left_start = left_start + 2*curr_size ){
         int mid = min(left_start + curr_size - 1, n-1);
         int right_end =  min(left_start + 2*curr_size - 1, n-1);
         merge(A, left_start, mid, right_end);
      }
   }
}


void merge_sort_recursivo(int A[], int start , int end ){
   if( start < end ){
      int mid = (start + end )/2;
      merge_sort_recursivo(A, start, mid );
      merge_sort_recursivo(A, mid+1, end );
      merge(A, start, mid, end);
   }
}


int main() {
   FILE *fp;
   int val{0};
   int tam{70000};  // int n = sizeof(A)/sizeof(A[0]);
   int A[tam] = {}; // lo mismo que crear un for(int i=0;i<tam;i++){ A[i] = 0; }
   fp = fopen("file.txt", "r");
   int i{0};

   while (i < tam) {
      fscanf(fp, "%d\n", &val);
      A[i] = val;
      i++;
   }
   fclose(fp);

    merge_sort_iterativo(A, tam);
    merge_sort_recursivo(A, 0, tam-1 );

   fp = fopen("output.txt", "w");
   i = 0;
   while (i < tam) {
      fprintf(fp, "%d\n", A[i]);
      i++;
   }
   fclose(fp);

  return 0;
}
