# function to calculate the factorial of a number
def factorial(n):
    # base case: factorial of 0 is 1
    if n == 0:
        return 1
    else:
        # recursive case: n! = n * (n-1)!
        return n * factorial(n - 1)
    
# get the number from the user
num = int(input("Enter a number: "))
# calculate the factorial of the number
result = factorial(num)

# print the result
print("The factorial of", num, "is", result)

import pandas as pd