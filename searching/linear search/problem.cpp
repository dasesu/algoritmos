#include <iostream>

int main( int argc, char *argv[]){
   int n{0};
   scanf("%d", &n);

   long long m{0};
   scanf("%lld", &m);
   long long A[n]={};
   for (int i = 0; i < n; i++) {
      scanf("%lld", &A[i]);
   }
   int index{0}; 
   for (int i = 0; i < n; i++) {
      if( A[i] == m ){
         index = i;
      }
   }
   printf("%d", index+1 );
   return 0;
}
