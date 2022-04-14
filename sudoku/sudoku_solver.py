# Sporo zbędnego kodu, pisanego głównie żeby poćwiczyć obiektówkę
# Funkcyjnie by było dużo szybciej

class SudokuSquare:
    def __init__(self, list_to_convert: list):
        self.__inner_list = list_to_convert
        self.__solved_squares = set()

    def __str__(self):
        if not self.__solved_squares:
            return "Not solvable!"
        list_to_return = []
        for square in self.__solved_squares:
            square_string = ""
            for i in range(9):
                for j in range(9):
                    square_string = square_string + str(square[i][j]) + "  "
                    if j == 8:
                        square_string = square_string + "\n"
            square_string = square_string + "____________________________\n"
            list_to_return.append(square_string)
        return "".join(list_to_return)

    # checks if num n is possible in position [row][col]
    def __is_num_possible(self, row, col, n):
        row_region_start = (row // 3) * 3   # starting coordinates of a region of the sudoku square
        col_region_start = (col // 3) * 3   # starting coordinates of a region of the sudoku square
        # check in region
        for i in range(3):
            for j in range(3):
                if self.__inner_list[row_region_start + i][col_region_start + j] == n:
                    return False
        # check row and column
        for i in range(9):
            if self.__inner_list[row][i] == n:
                return False
            if self.__inner_list[i][col] == n:
                return False
        return True

    # Solver
    def solve(self):
        for i in range(9):
            for j in range(9):
                if self.__inner_list[i][j] == 0:
                    for num in range(1, 10):
                        if self.__is_num_possible(i, j, num):
                            self.__inner_list[i][j] = num
                            self.solve()
                            self.__inner_list[i][j] = 0
                    return
        self.__solved_squares.add(tuple(tuple(i) for i in self.__inner_list))