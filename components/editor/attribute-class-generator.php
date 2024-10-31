<?php
function savvy_col_class_generator($cols)
{
    $class_list = [];
    foreach ($cols as $breakpoint => $col_value) {
        $breakpoint_css = $breakpoint !== '_' ? "$breakpoint-" : '';

        if ($col_value) {
            array_push($class_list, "col-$breakpoint_css$col_value");
        }
    }

    return implode(' ', $class_list);
}

function savvy_gap_class_generator($gaps)
{
    $class_list = [];

    foreach ($gaps as $breakpoint => $gap) {
        $gap_y = $gap['y'];
        $gap_x = $gap['x'];

        $breakpoint_css = $breakpoint !== '_' ? "$breakpoint-" : '';

        if ($gap_x === $gap_y && $gap_x) {
            array_push($class_list, "g-$breakpoint_css$gap_x");
        } else {
            if (isset($gap_x) && $gap_x !== '') {
                array_push($class_list, "gx-$breakpoint_css$gap_x");
            }
            if (isset($gap_y) && $gap_y !== '') {
                array_push($class_list, "gy-$breakpoint_css$gap_y");
            }
        }
    }

    return implode(' ', $class_list);
}

function savvy_flex_alignment_class_generator($flex_alignment)
{
    $class_list = [];
    foreach ($flex_alignment as $breakpoint => $item) {
        $align_items = $flex_alignment[$breakpoint]['align-items'];
        $justify_content = $flex_alignment[$breakpoint]['justify-content'];

        $breakpoint_css = $breakpoint !== '_' ? "$breakpoint-" : '';

        if ($justify_content) {
            array_push($class_list, "justify-content-$breakpoint_css$justify_content");
        }
        if ($align_items) {
            array_push($class_list, "align-items-$breakpoint_css$align_items");
        }
    }

    return implode(' ', $class_list);
}

function savvy_padding_class_generator ($padding)
{
    $class_list = [];

    foreach ($padding as $breakpoint => $item) {
        $pt = isset($padding[$breakpoint]['top']) ? $padding[$breakpoint]['top'] : 0;
        $pe = isset($padding[$breakpoint]['right']) ? $padding[$breakpoint]['right'] : 0;
        $pb = isset($padding[$breakpoint]['bottom']) ? $padding[$breakpoint]['bottom'] : 0;
        $ps = isset($padding[$breakpoint]['left']) ? $padding[$breakpoint]['left'] : 0;
        $py = ($pt === $pb) ? $pt : '';
        $px = ($pe === $ps) ? $pe : '';

        $breakpoint_css = $breakpoint !== '_' ? "$breakpoint-" : '';

        if ($px === $py && $px) {
            array_push($class_list, "p-$breakpoint_css$px");
        } else {
            if ($px) {
                array_push($class_list, "px-$breakpoint_css$px");
            } else {
                if ($pe) {
                    array_push($class_list, "pe-$breakpoint_css$pe");
                }

                if ($ps) {
                    array_push($class_list, "ps-$breakpoint_css$ps");
                }
            }
            if ($py) {
                array_push($class_list, "py-$breakpoint_css$py");
            } else {
                if ($pt) {
                    array_push($class_list, "pt-$breakpoint_css$pt");
                }

                if ($pb) {
                    array_push($class_list, "pb-$breakpoint_css$pb");
                }
            }
        }
    }

    return implode(' ', $class_list);
}

function savvy_item_width_class_generator($item_width) {
    $css_variables = [];

    foreach ($item_width as $breakpoint => $item) {
        $width_value = $item_width[$breakpoint];

        $breakpoint_css = $breakpoint !== '_' ? "-$breakpoint" : '';

        if ($width_value) {
            $variable_name = "--width{$breakpoint_css}";
            array_push($css_variables, "{$variable_name}:{$width_value}");
        }
    }

    return implode(';', $css_variables);
};

function savvy_border_style_class_generator($attributes) {
    $border = $attributes['border'] ?? [];
    $class_list = [];

    foreach ($border as $breakpoint => $item) {
        if (isset($border[$breakpoint]['style'])) {
            $style = $border[$breakpoint]['style'];

            $breakpoint_css = $breakpoint !== '_' ? "$breakpoint-" : '';

            array_push($class_list, "border-style-$breakpoint_css$style");
        }
    }

    return implode(' ', $class_list);
};

function savvy_border_color_class_generator($attributes) {
    $border = $attributes['border'] ?? [];
    $states = isset($attributes['elementStates']) ? $attributes['elementStates'] : [];
    $class_list = [];

    foreach ($border as $breakpoint => $item) {
        if (isset($border[$breakpoint]['color'])) {
            $color = $border[$breakpoint]['color'];

            $breakpoint_css = $breakpoint !== '_' ? "$breakpoint-" : '';

            array_push($class_list, "border-color-$breakpoint_css$color");
        }
    }

    foreach ($states as $state => $state_props) {
        if (isset($state_props['border'])) {
            foreach ($state_props['border'] as $breakpoint => $item) {
                if (isset($state_props['border'][$breakpoint]['color'])) {
                    $color = $state_props['border'][$breakpoint]['color'];

                    $breakpoint_css = $breakpoint !== '_' ? "-$breakpoint" : '';

                    array_push($class_list, "border-color-$state$breakpoint_css-$color");
                }
            }
        }
    }

    return implode(' ', $class_list);
};

function savvy_border_radius_variable_generator($attributes) {
    $border = $attributes['border'] ?? [];
    $css_variables = [];

    foreach ($border as $breakpoint => $item) {
        if (isset($border[$breakpoint]['radius'])) {
            $radius_value = $border[$breakpoint]['radius'];

            $breakpoint_css = $breakpoint !== '_' ? "-$breakpoint" : '';

            if ($radius_value) {
                $variable_name = "--border-radius{$breakpoint_css}";
                array_push($css_variables, "{$variable_name}:{$radius_value}");
            }
        }
    }

    return count($css_variables) ? implode(';', $css_variables) . ';' : '';
}

function savvy_border_width_variable_generator($attributes) {
    $border = isset($attributes['border']) ? $attributes['border'] : [];
    $states = isset($attributes['elementStates']) ? $attributes['elementStates'] : [];
    $css_variables = [];

    foreach ($border as $breakpoint => $item) {
        if (isset($border[$breakpoint]['width'])) {
            $width_value = $border[$breakpoint]['width'];

            $breakpoint_css = $breakpoint !== '_' ? "-$breakpoint" : '';

            if ($width_value) {
                $variable_name = "--border-width{$breakpoint_css}";
                array_push($css_variables, "{$variable_name}:{$width_value}");
            }
        }
    }

    foreach ($states as $state => $state_props) {
        if (isset($state_props['border'])) {
            foreach ($state_props['border'] as $breakpoint => $item) {
                if (isset($state_props['border'][$breakpoint]['width'])) {
                    $width_value = $state_props['border'][$breakpoint]['width'];

                    $breakpoint_css = $breakpoint !== '_' ? "-$breakpoint" : '';

                    if ($width_value) {
                        $variable_name = "--border-width-{$state}{$breakpoint_css}";
                        array_push($css_variables, "{$variable_name}:{$width_value}");
                    }
                }
            }
        }
    }
    return count($css_variables) ? implode(';', $css_variables) . ';' : '';
}
