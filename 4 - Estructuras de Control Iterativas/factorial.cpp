#include <iostream>
//#include <stdio.h>

/*
int factorial_recursiva(int x){
   if(x==0){
      return 1;
   }else if(x==1){
      return 1;
   }else{
      return x*factorial(x-1);
   }
   return 0;
}
*/

int factorial(int num){
   int ans=1;
   if(num<2){
      ;
   }else{
      for (int i = 1; i <= num; ++i) {
         ans = ans * i;
      }
   }
   return ans;
}


int main (int argc, char *argv[]){
   int num;
   //std::scanf("%d", &num);
   //std::printf("%d\n", factorial(num));
   std::cin >> num;
   std::cout << factorial(num) << '\n';
   return 0;
}
