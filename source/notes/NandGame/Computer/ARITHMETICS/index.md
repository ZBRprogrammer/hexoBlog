---
title: NandGame Computer-Arithmetics
date: 2026/06/13
update: 2026/06/13
description: NandGame解题全集（Computer部分）
notebook: notes
katex: true
tags: 
    - Puzzle
    - NandGame/Computer/Arithmetics
keywords: 
    - NandGame
    - puzzles
highlight_shrink: false
---
# Arithmetics

## Half Adder（半加器）
{% tabs align:center %}
<!-- tab English -->
Description: 
An **add** component that adds two bits. The output is a two-bit value.
The **h** output is the high bit, the **l** is the low bit.
<!-- tab 中文 -->
任务描述：
**加法**元件将两个比特相加。结果是个2位的值。
**h**输出是高位，**l**输出是低位（就像在2位10进制数中，十位是高位，个位是低位）。
{% endtabs %}

{% tabs align:center %}
<!-- tab 真值表 -->

|a|b|h|l|
|---|---|---|---|
|0|0|0|0|
|0|1|0|1|
|1|0|0|1|
|1|1|1|0|

{% endtabs %}

Half Adder 的逻辑描述为 `h = a and b; l = a xor b`
经过数学推理：
$$
\begin{aligned}
h & = a \wedge b\\
  & = \neg (\neg (a \wedge b))\\
  & = inv(nand(a,b))\\
  \\
l & = (\neg a \wedge b) \vee (a \wedge \neg b) \\
  & = \neg (\neg (a \wedge \neg (a \wedge b)) \wedge \neg (b \wedge \neg (a \wedge b)))\\
  & = nand(nand(a,nand(a,b)),nand(b,nand(a,b)))
\end{aligned}
$$
故解法的VHDL描述为：
```VHDL
-- 实体：Half_Adder
library ieee;
use ieee.std_logic_1164.all;

entity half_adder is
    port (
        a, b : in  std_logic;  -- 输入
        h, l : out std_logic   -- 输出 
    );
end half_adder;

architecture struct of half_adder is

signal s : std_logic;

begin
    s <= a nand b;
    h <= not s;
    l <= (a nand s) nand (b nand s);
end struct;
```
## Full Adder（全加器）
{% tabs align:center %}
<!-- tab English -->
Description: 
An **add** component which adds three bits: **a**, **b**, and **c**.
The output is a two-bit value. The **h** output is the high bit, the **l** is the low bit.
<!-- tab 中文 -->
任务描述：
一个**加法**元件，有3个输入：**a**, **b**, 和**c**。
输出是一个2位的数值。**h**是高位、**l**是低位。
{% endtabs %}

{% tabs align:center %}
<!-- tab 真值表 -->

|a|b|c|h|l|
|---|---|---|---|---|
|0|0|0|0|0|
|0|0|1|0|1|
|0|1|0|0|1|
|0|1|1|1|0|
|1|0|0|0|1|
|1|0|1|1|0|
|1|1|0|1|0|
|1|1|1|1|1|

{% endtabs %}

Full Adder 的逻辑描述为:
```
h = (a and b) or (b and c) or (a and c);
l = a xor b xor c
```
如果使用Half_Adder，可以有另一种表达方式：
```
h1,l1 = Half_Adder(a,b);
h2,l2 = Half_Adder(l1,c);
h = h1 or h2;
l = l2;
```
经过分解 Half_Adder 和 or 门，可以得到9门解法：
```VHDL
-- 实体：Full_Adder
library ieee;
use ieee.std_logic_1164.all;

entity full_adder is
    port (
        a, b, c : in  std_logic;  -- 输入
        h, l    : out std_logic   -- 输出 
    );
end full_adder;

architecture struct of full_adder is

signal s1, t1, s2, t2 : std_logic;

begin
    s1 <= a nand b;
    t1 <= (a nand s1) nand (b nand s1);
    s2 <= t1 nand c;
    t2 <= (t1 nand s2) nand (c nand s2);
    h <= s1 nand s2;
    l <= t2;

end struct;
```
## Multi-bit Adder（多位加法器）
{% tabs align:center %}
<!-- tab English -->
Description: 
Build an adder that adds two 2-bit numbers and a 1-bit carry.
**Input**
**a1** **a0** is a 2-bit number.
**b1** **b0** is a 2-bit number.
**c** (input carry) is a 1-bit number.
**Output**
The sum of the input numbers as the 3-bit number **c** **s1** **s0** where **c** is the high bit.
<!-- tab 中文 -->
任务描述：
做一个能加两个2位数和1位进位的加法器。
**输入**
**a1** **a0**是一个2位数字。
**b1** **b0**是一个2位数字。
**c**（进位输入）是一个1位数字。
**输出**
输入数字的和，是一个3位数字：**c** **s1** **s0**其中**c**是最高位。
{% endtabs %}

{% tabs align:center %}
<!-- tab 示例 -->

|a1|a0|b1|b0|c|C|s1|s0|
|---|---|---|---|---|---|---|---|
|1|0|1|0|1|1|0|1|

2+2+1=5

{% endtabs %}

Full Adder 的逻辑描述为:
```
h = (a and b) or (b and c) or (a and c);
l = a xor b xor c
```
如果使用Half_Adder，可以有另一种表达方式：
```
h1,l1 = Half_Adder(a,b);
h2,l2 = Half_Adder(l1,c);
h = h1 or h2;
l = l2;
```
经过分解 Half_Adder 和 or 门，可以得到9门解法：
```VHDL
-- 实体：Full_Adder
library ieee;
use ieee.std_logic_1164.all;

entity full_adder is
    port (
        a, b, c : in  std_logic;  -- 输入
        h, l    : out std_logic   -- 输出 
    );
end full_adder;

architecture struct of full_adder is

signal s1, t1, s2, t2 : std_logic;

begin
    s1 <= a nand b;
    t1 <= (a nand s1) nand (b nand s1);
    s2 <= t1 nand c;
    t2 <= (t1 nand s2) nand (c nand s2);
    h <= s1 nand s2;
    l <= t2;

end struct;
```
通过后，有通关提示：
> 可加2位二进制数的元件可以通过叠加实现任意多位数的加法。
> 既然我们要做的是一个16位处理器，我们将它叠加到能加16位数，加入你的工具箱，并叫它**add 16**.

## Increment（自增器）
{% tabs align:center %}
<!-- tab English -->
Description: 
Add **1** to a 16-bit number.
Ignore the carry if the result is larger than 16 bits
<!-- tab 中文 -->
任务描述：
让一个16位数增加**1**。
结果大于16位时，忽略进位
{% endtabs %}

Increment 的描述为`A = A + 1`
使用16为加法器和非门即可。
```VHDL
-- 实体：Increment
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity increment_16bit is
    port (
        A : in  std_logic_vector(15 downto 0);   -- 16位输入
        Y : out std_logic_vector(15 downto 0)    
    );
end increment_16bit;

architecture behavioral of increment_16bit is
begin
    Y <= std_logic_vector(unsigned(A) + 1);
end behavioral;
```
## Subtraction（减法器）
{% tabs align:center %}
<!-- tab English -->
Description: 
Outputs A minus B as a 16-bit number.
If the result is less than zero it is represented as 65536 plus the result.
Examples:
|result|16-bit binary|unsigned decimal|
|-|-|-|
|1|0000000000000001|1|
|0|0000000000000000|0|
|-1|1111111111111111|65535|
|-2|1111111111111110|65534|
|-3|1111111111111101|65533|

(This is equivalent to two's complement representation)
<!-- tab 中文 -->
任务描述：
输出一个16位数，为A减B。
如果结果小于0，表示为65536加结果。
例如:
|结果|16位二进制|无符号十进制|
|-|-|-|
|1|0000000000000001|1|
|0|0000000000000000|0|
|-1|1111111111111111|65535|
|-2|1111111111111110|65534|
|-3|1111111111111101|65533|

(这就是二的补码)
{% endtabs %}

Subtraction 的描述为`C = A - B`
`-B = ~B +1`，即补码（负数）等于反码+1
```VHDL
-- 实体：Subtraction
library ieee;
use ieee.std_logic_1164.all;

entity subtract_16bit is
    port (
        A, B : in  std_logic_vector(15 downto 0);  -- 被减数A，减数B
        Y    : out std_logic_vector(15 downto 0) 
    );
end subtract_16bit;

architecture structural of subtract_16bit is
    component adder_16bit is
        port (A, B : in  std_logic_vector(15 downto 0); SUM : out std_logic_vector(15 downto 0));
    end component;
    component inverter_16bit is
        port (X : in  std_logic_vector(15 downto 0); Y : out std_logic_vector(15 downto 0));
    end component;
    component increment_16bit is
        port (A : in  std_logic_vector(15 downto 0); Y : out std_logic_vector(15 downto 0));
    end component;

    signal notB : std_logic_vector(15 downto 0);
    signal temp : std_logic_vector(15 downto 0);  -- A + ~B
begin
    inv : inverter_16bit port map (X => B, Y => notB);
    add : adder_16bit port map (A => A, B => notB, SUM => temp);
    inc : increment_16bit port map (A => temp, Y => Y);
end structural;
```
> 恭喜，你已经完成了基本四则运算的元件。
> 现代处理器支持更复杂的运算，比如乘法、除法和浮点数运算， 但在这个游戏里，我们尽可能保持简单，做一个最简的、能工作的处理器。

## Equal to Zero
{% tabs align:center %}
<!-- tab English -->
Description: 
Should output 1 if and only if all bits in the input are 0.
<!-- tab 中文 -->
任务描述：
如果输入的所有位都是0，输出1。
{% endtabs %}

换句话说，当有任意一位为1时，输出0.
```VHDL
-- 实体：Equal to Zero
library ieee;
use ieee.std_logic_1164.all;

entity Equal_to_zero is
    port (
        b3, b2, b1, b0 : in  std_logic;
        y    : out std_logic
    );
end Equal_to_zero;

architecture structural of Equal_to_zero is
begin
    y <= not ((b3 or b2) or (b1 or b0))
end structural;
```
> 同样的方法很容易延申到16位数。因此我们也做出了检查16位数是否为0的元件。

## Less than Zero
{% tabs align:center %}
<!-- tab English -->
Description: 
Outputs 1 if the input as a 16-bit number is negative
Specification:
|Input|Output|
|---|---|
|input ≥ 0|0|
|input < 0|1|

A number is considered less than zero if bit 15 is 1.
**Bit numbering**
Bits are numbered from right to left, starting with 0 as the rightmost bit. So bit 15 is the leftmost bit in a 16-bit word.
<!-- tab 中文 -->
任务描述：
如果作为输入的16位数是负数，输出1。
要求：
|输入|输出|
|-|-|
|输入 $\le$ 0|0|
|输入 $\gt$ 0|1|

如果第15位是1，那么这个数就小于0。
位的序号
我们将数字的每一位从右往左标上序号。最右边是第0位。因此，在一个16位的字中，最左边一位是第15位。
{% endtabs %}

依题意做即可
```VHDL
-- 实体：Less than Zero
library ieee;
use ieee.std_logic_1164.all;

entity Less_than_zero is
    port (
        A : in  std_logic_vector(15 downto 0);
        y    : out std_logic
    );
end Less_than_zero;

architecture structural of Less_than_zero is
begin
    y <= A(0);
end structural;
```
> 同样的方法很容易延申到16位数。因此我们也做出了检查16位数是否为0的元件。

# 文章完
你通关了NandGame-Computer-Arithmetics章节！