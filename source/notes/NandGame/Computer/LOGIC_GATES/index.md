---
title: NandGame Computer-Logic_gates
date: 2026/06/12
update: 2026/06/12
description: NandGame解题全集（Computer部分）
notebook: notes
katex: true
tags: 
    - Puzzle
    - NandGame/Computer/Logic_gates
keywords: 
    - NandGame
    - puzzles
highlight_shrink: false
---
# Logic Gates

## Nand

{% tabs align:center %}
<!-- tab English -->
Description: 
Your task is to connect inputs to output through wires and relays such that when both **a** and **b** inputs are 1, the output is 0.
**1** represents electrical current, **0** represents no current.
The **V** input carries constant current, i.e. always 1.
<!-- tab 中文 -->
任务描述：
你的第一个任务，是使用继电器做出一个 **与非门** 元件。
与非门元件，只有当两个输入 **a** 和 **b** 均为1时，才输出0。
**1** 代表电路中有电流，**0** 代表没有电流。
输入 **V** 是一个恒定电流，就是一直保持为1的意思。
有2种不同类型的继电器：一种在平常（默认）状态下是导通的，需要电流来把它关断。另一种平常状态是关断的，需要电流来开通。
{% endtabs %}

{% tabs align:center %}
<!-- tab 真值表 -->

|a|b|out|
|---|---|---|
|0|0|1|
|1|0|1|
|0|1|1|
|1|1|0|

{% endtabs %}

{% grid %}
<!-- cell -->
{% tabs align:center %}
<!-- tab relay(default on)真值表 -->

|c|in|out|
|---|---|---|
|0|0|0|
|1|0|0|
|0|1|1|
|1|1|0|

{% endtabs %}

其逻辑可以使用 `out = (not c) and in` 描述.
当输入 `in` 为 `1` 时，可以充当 Not 门.

<!-- cell -->
{% tabs align:center %}
<!-- tab relay(default off)真值表 -->

|c|in|out|
|---|---|---|
|0|0|0|
|1|0|0|
|0|1|0|
|1|1|1|

{% endtabs %}

其逻辑可以使用 `out = c and in` 描述
可以充当 And 门

{% endgrid %}

Nand 门的逻辑描述为 `out = not (a and b)`
经过数学推理：
$$
\begin{aligned}
out & = \neg (a \wedge b) \\
    & = relay_{on}(relay_{off}(a,b),V)
\end{aligned}
$$
故解法的VHDL描述为：
```VHDL
-- 实体：nand 门
library ieee;
use ieee.std_logic_1164.all;

entity nand_gate is
    port (
        a, b : in  std_logic;  -- 输入
        y    : out std_logic   -- 输出 out = not (a and b)
    );
end nand_gate;

architecture struct of nand_gate is
    function relay_default_on(a_in, b_in : std_logic) return std_logic is
    begin
        return (not a_in) and b_in;
    end function;

    function relay_default_off(a_in, b_in : std_logic) return std_logic is
    begin
        return a_in and b_in;
    end function;

    signal temp : std_logic;
begin
    temp <= relay_default_off(a, b);
    y <= relay_default_on(temp, '1');
end struct;
```

## Invert

{% tabs align:center %}
<!-- tab English -->
Description: 
The next task is to build an inverter (**inv**) component.
An **inv**-component has a single input and a single output.
The output should be the opposite of the input, so 0 for 1 and vice versa.
<!-- tab 中文 -->
任务描述：
你的任务是做一个非门(**inv**)。
非门(**inv**)有一个输入和一个输出
输出和输入总是相反的：0得到1，1得到0。
元件的要求通常会被列在一个表中。
{% endtabs %}

{% tabs align:center %}
<!-- tab 真值表 -->

|in|out|
|---|---|
|0|1|
|1|0|

{% endtabs %}

Inv 门的逻辑描述为 `out = not in`
经过数学推理：
$$
\begin{aligned}
out & = \neg in \\
    & = \neg (in \wedge in) \\
    & = nand(in,in)
\end{aligned}
$$
故解法的VHDL描述为：
```VHDL
-- 实体：inv 门
library ieee;
use ieee.std_logic_1164.all;

entity inv_gate is
    port (
        a : in  std_logic;  -- 输入
        y : out std_logic   -- 输出 out = not in
    );
end inv_gate;

architecture struct of inv_gate is

begin
    y  <= a nand a;
end struct;
```
## And

{% tabs align:center %}
<!-- tab English -->
Description: 
An **and** gate's output is 1 when both inputs are 1.
<!-- tab 中文 -->
任务描述：
**与门**只有在2个输入都是1的情况下，输出才是1.
{% endtabs %}

{% tabs align:center %}
<!-- tab 真值表 -->

|a|b|out|
|---|---|---|
|0|0|0|
|1|0|0|
|0|1|0|
|1|1|1|

{% endtabs %}

And 门的逻辑描述为 `out = a and b`
经过数学推理：
$$
\begin{aligned}
out & = a \wedge b \\
    & = \neg(\neg(a \wedge b))\\
    & = inv(nand(in,in))
\end{aligned}
$$
故解法的VHDL描述为：
```VHDL
-- 实体：and 门
library ieee;
use ieee.std_logic_1164.all;

entity and_gate is
    port (
        a, b : in  std_logic;  -- 输入
        y    : out std_logic   -- 输出 out = a and b
    );
end and_gate;

architecture struct of and_gate is

begin
    y  <= not (a nand b);
end struct;
```

## Or

{% tabs align:center %}
<!-- tab English -->
Description: 
An **or** gate output is 1 when at least one input is 1.
<!-- tab 中文 -->
任务描述：
只要有一个输入为1，**或门**就会输出1.
{% endtabs %}

{% tabs align:center %}
<!-- tab 真值表 -->

|a|b|out|
|---|---|---|
|0|0|0|
|1|0|1|
|0|1|1|
|1|1|1|

{% endtabs %}

Or 门的逻辑描述为 `out = a or b`
经过数学推理：
$$
\begin{aligned}
out & = a \vee b \\
    & = \neg(\neg(a \vee b))\\
    & = \neg(\neg a \wedge \neg b)\\
    & = nand(inv(a),inv(b))
\end{aligned}
$$
故解法的VHDL描述为：
```VHDL
-- 实体：or 门
library ieee;
use ieee.std_logic_1164.all;

entity or_gate is
    port (
        a, b : in  std_logic;  -- 输入
        y    : out std_logic   -- 输出 out = a or b
    );
end or_gate;

architecture struct of or_gate is

begin
    y  <= (not a) nand (not b);
end struct;
```

## Xor

{% tabs align:center %}
<!-- tab English -->
Description: 
An **xor** gate's output is 1 when the two inputs are different.
<!-- tab 中文 -->
任务描述：
当两个输入不一样时，**异或门**输出1.
{% endtabs %}

{% tabs align:center %}
<!-- tab 真值表 -->

|a|b|out|
|---|---|---|
|0|0|0|
|1|0|1|
|0|1|1|
|1|1|0|

{% endtabs %}

Xor 门的逻辑描述为 `out = ((not a) and b) or (a and (not b))`
经过数学推理：
$$
\begin{aligned}
out & = (\neg a \wedge b) \vee (a \wedge \neg b) \\
    & = (a \wedge \neg a) \vee (\neg a \wedge b) \vee (a \wedge \neg b) \vee (b \wedge \neg b)\\
    & = (a \vee b) \wedge (\neg a \vee \neg b)\\
    & = \neg (\neg a \wedge \neg b) \wedge \neg(a \wedge b)\\
    & = \neg ((\neg a \wedge \neg b) \vee (a \wedge b))\\
    & = \neg ((\neg a \wedge \neg b) \vee ((a \wedge b) \wedge (\neg a \vee \neg b \vee 1)))\\
    & = \neg ((\neg a \wedge \neg b) \vee ((a \wedge b) \wedge \neg a)) \vee ((a \wedge b) \wedge \neg b) \vee (a \wedge b)\\
    & = \neg ((\neg a \wedge \neg b) \vee ((a \wedge b) \wedge \neg a)) \vee ((a \wedge b) \wedge \neg b) \vee ((a \wedge b) \wedge (a \wedge b))\\
    & = \neg ((\neg a \vee (a \wedge b)) \wedge (\neg b \vee (a \wedge b)))\\
    & = \neg (\neg (a \wedge \neg (a \wedge b)) \wedge \neg (b \wedge \neg (a \wedge b)))\\
    & = nand(nand(a,nand(a,b)),nand(b,nand(a,b)))
\end{aligned}
$$
> 推导过程让我回忆起了：$a+b=1$，求$\frac{1}{a}+\frac{1}{b}$的最小值。

故解法的VHDL描述为：
```VHDL
-- 实体：xor 门
library ieee;
use ieee.std_logic_1164.all;

entity xor_gate is
    port (
        a, b : in  std_logic;  -- 输入
        y    : out std_logic   -- 输出 out = a xor b
    );
end xor_gate;

architecture struct of xor_gate is
signal s,m,n : std_logic;
begin
    s <= a nand b;
    m <= a nand s;
    n <= b nand s;
    y <= m nand n;

end struct;
```

# 文章完
你完成了NandGame-Computer-Logic_gates章节！