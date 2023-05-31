#include <iostream>

int fibo_iter_ver1(int n){
   int n1{-1}; // se cambia el valor base convenientemente
   int n2{1};
   int k{-99};
   for (int i = 0; i < n; i++) {
      k = n2 + n1;
      n1 = n2; 
      n2 = k;
   }
   return k;
}

int fibo_iter_ver2(int n){
   int n1=0; // se conservan los valores teoricos de la funcion de fibonacci
   int n2=1;
   int k=-99;
   if(n==1){
      k=0;
   }else if(n==2){
      k=1;
   }else{
      for(int i=2;i<n;i++){
         k = n1 + n2;
         n1 = n2;
         n2 = k;
      }
   }
   return k;
}


int fibo_recursiva(int n){
   if(n==0){
      return 0;
   }else if(n==1){
      return 1;
   }else{
      return fibo_recursiva(n-1)+fibo_recursiva(n-2);
   }
}

void fibo_nterminos( int n ){
   for( int i=1; i<=n; i++ ){
      std::cout << fibo_iter_ver2(i) << ' ';
   }
   std::cout << "\n";
}


int main(int argc, char *argv[]){
   int numero{0};
   std::cout << "Introduzca un numero N: ";
   std::cin >> numero;
   fibo_nterminos( numero );
   return 0;
}
