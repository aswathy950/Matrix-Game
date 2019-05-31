function matrixMoveAndIncrement() {
    var defaultValues = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    startBtn = $("#start-button"),
    resetBtn = $("#reset-button"),
    textInput,
    modal = $("#myModal");
    createTheMatrix(defaultValues);

    $(document).click(function(e) {
        if (e.target.id === 'myModal') {
            modal.addClass('display-none');
        }
    });

    function getInput(row, column) {
        var input = $("[row=" + row + "][column=" + column + "]");
        return input;
    }

    function createTheMatrix(matrixItems) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var matrixColumn = $('<input type="text" value=' + matrixItems[i][j] + ' id=' + j + ' class="matrixColumn" readonly row=' + i + ' column=' + j + '>');
                $('#row-' + i + '').append(matrixColumn);
            }
        }
        textInput = $('input.matrixColumn');
    }


    startBtn.click(function() {
        startGame();
        startBtn.attr("disabled", true);
        resetBtn.attr("disabled", false);
    });
    resetBtn.click(function() {
        textInput.removeClass('selectedColumn');
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                getInput(i, j).val(defaultValues[i][j]);
            }
        }
        $(document).unbind('keydown');
        startBtn.attr("disabled", false);
        resetBtn.attr("disabled", true);
    });


    function startGame() {
    	var tempArr = JSON.parse(JSON.stringify(defaultValues));
        var row = 0,
            column = 0;
        getInput(row, column).addClass('selectedColumn');
        $(document).keydown(function(e) {
            if (e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 40 || e.keyCode === 38) {
                var tempRow = row,
                    tempColumn = column;
                switch (e.keyCode) {
                    case 39:
                        tempColumn++;
                        break;
                    case 37:
                        tempColumn--;
                        break;
                    case 40:
                        tempRow++;
                        break;
                    case 38:
                        tempRow--;
                        break;
                }

                if (tempColumn >= 0 && tempColumn < 3 && tempRow >= 0 && tempRow < 3) {
                    row = tempRow;
                    column = tempColumn;
                    tempArr[row][column] = tempArr[row][column] + 1;
                    textInput.removeClass('selectedColumn');
                    getInput(row, column).val(tempArr[row][column]); 
                    getInput(row, column).addClass('selectedColumn');

                    if (checkEqual(tempArr[0]) && checkEqual(tempArr[1]) && checkEqual(tempArr[2])) {
                        if (tempArr[0][0] === tempArr[1][0] &&  tempArr[1][0] === tempArr[2][0]) {
                            textInput.removeClass('selectedColumn');
                            $(document).unbind('keydown');
                            modal.removeClass('display-none');
                        }
                    }
                    
                }
            }
        });
    }
    function checkEqual(array) {
    	var equals = array.join('').split(array[0]).join('').length === 0;
    	return equals;
    }

}
matrixMoveAndIncrement();