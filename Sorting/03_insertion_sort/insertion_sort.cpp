#include <iostream>

int insertion_sort(int A[], int n) {
   int value{0};
   int hole{0};
   for(int i=0; i<n; i++ ){ 
      value=A[i];
      hole = i;
      while( hole > 0 && A[hole-1] > value ){
         A[hole] = A[hole-1];
         hole--; // hole = hole - 1;
      }
      A[hole] = value;
   }
   return 0; 
}


int main() {
   FILE *fp;
   int val{0};
   int tam{70000};
   int A[tam] = {}; // lo mismo que crear un for(int i=0;i<tam;i++){ A[i] = 0; }
   fp = fopen("file.txt", "r");
   int i{0};

   while (i < tam) {
      fscanf(fp, "%d\n", &val);
      A[i] = val;
      i++;
   }
   fclose(fp);

   insertion_sort(A, tam );
   fp = fopen("output.txt", "w");
   i = 0;
   while (i < tam) {
      fprintf(fp, "%d\n", A[i]);
      i++;
   }
   fclose(fp);

  return 0;
}
