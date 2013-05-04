function HexRgbController($scope) {

    var COLOURS = {
        AQUA: '#00FFFF',
        BLACK: '000',
        BLUE: '#0000FF',
        FUCHSIA: '#FF00FF',
        GRAY: '#808080',
        GREEN: '#008000',
        LIME: '#00FF00',
        MAROON: '#800000',
        NAVY: '#000080',
        OLIVE: '#808000',
        ORANGE: '#FFA500',
        PURPLE: '#800080',
        RED: '#FF0000',
        SILVER: '#C0C0C0',
        TEAL: '#008080',
        WHITE: '#FFF',
        YELLOW: '#FFFF00'
    };


    $scope.color = {
        hex: '#fff',
        rgb: 'rgb(255, 255, 255)'
    };

    function calculateLuminance(hex) {
        var rgb = hexToRgb($scope.color.hex);
        var luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;

        return luminance;
    };

    function updatePageFontColor(hexColor) {
        var body = document.querySelector('body');
        var luminance = calculateLuminance(hexColor);

        if (luminance < 55) {
            angular.element(body).addClass('body--dark');
        }
        else {
            angular.element(body).removeClass('body--dark');
        }
    };


    function updatePageBgColor(hexColor) {
        var body = document.querySelector('body');
        angular.element(body)
            .css('background-color', hexColor);
    };

    $scope.updateRgb = function () {
        var newRgb;

        newRgb = hexToRgb($scope.color.hex)

        if (newRgb === null) {
            return;
        }

        $scope.color.rgb = 'rgb('
            + newRgb.r + ', '
            + newRgb.g + ', '
            + newRgb.b + ')';

        updatePageBgColor($scope.color.hex);
        updatePageFontColor($scope.color.hex);
    };

    $scope.updateHex = function () {
        var regex = /(\d{1,3})/g;
        var rgbValues = $scope.color.rgb.match(regex);
        var newHex;

        if (rgbValues === null || rgbValues.length !== 3) {
            return;
        }

        newHex = rgbToHex(+rgbValues[0], +rgbValues[1], +rgbValues[2]);

        if (newHex.length !== 7) {
            return;
        }

        $scope.color.hex = newHex;

        updatePageBgColor($scope.color.hex);
        updatePageFontColor($scope.color.hex);
    };


    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#"
            + componentToHex(r)
            + componentToHex(g)
            + componentToHex(b);
    }

    function hexToRgb(hex) {

        if (COLOURS[hex.toUpperCase()]) {
            hex = COLOURS[hex.toUpperCase()];
        }

        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // init
    updatePageBgColor($scope.color.hex);
}


