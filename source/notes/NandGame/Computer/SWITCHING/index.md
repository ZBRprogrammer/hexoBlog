---
title: NandGame Computer-Switching
date: 2026/06/14
update: 2026/06/14
description: NandGame解题全集（Computer部分）
notebook: notes
katex: true
tags: 
    - Puzzle
    - NandGame/Computer/Switching
keywords: 
    - NandGame
    - puzzles
highlight_shrink: false
---
# Switching

## Selector
{% tabs align:center %}
<!-- tab English -->
Description: 
A **select** component selects one out of two input bits for output.
The **s** (select) bit indicates which input is selected: If 0, **d0** is selected; if 1, **d1** is selected.
<!-- tab 中文 -->
任务描述：
**选择器**元件选择两个输入中的一个作为输出。
**s**为选择比特，决定选择哪个输入： 为0时，选择**d0**；为1时，选择**d1**。
{% endtabs %}

{% tabs align:center %}
<!-- tab 真值表 -->

|s|d0|d1|out|
|---|---|---|---|
|0|0|0|0|
|0|1|0|0|
|0|0|1|1|
|0|1|1|1|
|1|0|0|0|
|1|1|0|1|
|1|0|1|0|
|1|1|1|1|

{% endtabs %}
当s = 1时，输出可视为`out = s and d1`;
当s = 0时，输出可视为`out = (not s) and d0`;
两种输出取或；
拆分化简，得到4门解法；
故解法的VHDL描述为：
```VHDL
-- 实体：Selector
library ieee;
use ieee.std_logic_1164.all;

entity selector is
    port (
        s, d0, d1 : in  std_logic;
        y         : out std_logic
    );
end selector;

architecture struct of selector is

signal s0, s1 : std_logic;

begin
    s1 <= s nand d1;
    s0 <= (not s) nand d0;
    y <= s1 nand s0;
end struct;
```

## Switch
{% tabs align:center %}
<!-- tab English -->
Description: 
A **switch** component channels a data bit through one of two output channels.
The **s** (selector) determines if the **d** (data) bit is dispatched through **c1** or **c0**.
<!-- tab 中文 -->
任务描述：
**开关**元件将数据比特送到2个输出之一。
**s**(选择位)决定**d**(数据位)是从**c1**还是**c0**输出。
{% endtabs %}

{% tabs align:center %}
<!-- tab 真值表 -->

|s|d|c1|c0|
|---|---|---|---|
|0|0|0|0|
|0|1|0|1|
|1|0|0|0|
|1|1|1|0|

{% endtabs %}
对于输出c1，可视为`c1 = s and d`;
对于输出c0，可视为`c0 = (not s) and d`

$$
\begin{aligned}
    c1 & = s \wedge d\\
       & = \neg(\neg(s \wedge d))\\
       & = inv(nand(s,d))\\
    \\
    c0 & = \neg s \wedge d\\
       & = \neg(s \wedge d) \wedge d\\
       & = \neg(\neg(\neg(s \wedge d) \wedge d))\\
       & = inv(nand(nand(s,d),d))
\end{aligned}
$$

故解法的VHDL描述为：
```VHDL
-- 实体：Switch
library ieee;
use ieee.std_logic_1164.all;

entity switch is
    port (
        s, d  : in  std_logic;
        c1, c0: out std_logic
    );
end switch;

architecture struct of switch is

signal u : std_logic;

begin
    u <= s nand d;
    c1 <= not u;
    c0 <= not(u nand d);
end struct;
```

# 文章完
你完成了NandGame-Computer-Switch章节！