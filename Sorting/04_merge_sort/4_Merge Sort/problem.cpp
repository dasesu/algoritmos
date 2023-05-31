#include <cstdio>
using namespace std;

int contador{0};

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
         printf("n1=%d, n2=%d, (i,j)=(%d,%d), L[i]=%d, R[j]=%d \n", n1, n2, i,j, L[i], R[j]);
         contador++;
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

int main( int argc, char *argv[] ){
   int num{0};
   contador = 0;

   scanf("%d", &num);
   int A[num] = {}; // lo mismo que crear un for(int i=0;i<tam;i++){ A[i] = 0; }
   
   for( int i=0; i<num; i++ ){
      scanf("%d", &A[i]);
      //printf("%d ", A[i]);
   }
   
   merge_sort_iterativo(A, num );
   
   printf("%d", contador );

   return 0;
}
