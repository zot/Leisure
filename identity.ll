; to run: llc identity.ll && gcc identity.s && ./a.out

; ModuleID = 'test-lam.ll'
target datalayout = "e-p:32:32:32-i1:8:8-i8:8:8-i16:16:16-i32:32:32-i64:32:64-f32:32:32-f64:32:64-v64:64:64-v128:128:128-a0:0:64-f80:32:32-n8:16:32"
target triple = "i386-pc-linux-gnu"

; ident 3 ⇒ (λ0) [3]
;
; ident	0 	VAR_START
;	1 	USE_VAR
;	2 	RETURN
;
; main	3 	USE_CONTEXT ident, 0, -1, null
;	8 	BIND_CONTEXT VAR(3), -737, -1, -2
;	13 	RETURN

; CTX_NAME = 0
; CTX_ADDR = 1
; CTX_PARENT = 2
; CTX_RESULT = 3
; CTX_BINDING = 4

; TYPE_CTX = 2
; TYPE_PRIM = 0

; CTP_LAMBDA = 0
; CTP_APPLY = -2 ; (-1 << 2) | 2
; CTP_FREE_VAR = -6 ; (-2 << 2) | 2

%ctx = type <{i32, i32, i32, i32, i32}>
%func = type i32 (%ctx*)

; example
;  tail call i32 (i8*)* @puts(i8* noalias getelementptr inbounds ([4 x i8]* @d0, i32 0, i32 0)) nounwind

define internal cc 10 i32 @ident(%ctx* %cp) nounwind readnone {
  %var1raw = getelementptr %ctx* %cp, i32 0, i32 4; CTX_BINDING
  %var1int = load i32* %var1raw
  %var1 = inttoptr i32 %var1int to %ctx*
  br label %start1

start1:
  %type1 = and i32 %var1int, 3
  %cond1 = icmp eq i32 %type1, 2
  br i1 %cond1, label %checkCtxt1, label %done1

checkCtxt1:
  %var1Braw = getelementptr %ctx* %var1, i32 0, i32 4; CTX_BINDING
  %var1Bint = load i32* %var1Braw
  %cond1B = icmp eq i32 %var1Bint, -4; CTP_APPLY
  br i1 %cond1B, label %isApply1, label %done1

isApply1:
  %result1raw = getelementptr %ctx* %var1, i32 0, i32 3; CTX_RESULT
  %result1int = load i32* %result1raw
  %cond1C = icmp ne i32 %result1int, 0
  br i1 %cond1C, label %done1, label %jump1

jump1:
  %addr1raw = getelementptr %ctx* %var1, i32 0, i32 1; CTX_ADDR
  %addr1int = load i32* %addr1raw
  %addr1 = inttoptr i32 %addr1int to %func*
  %jumpRes1 = tail call cc 10 %func* %addr1(%ctx* %var1)
  br label %done1

done1:
  %res1 = phi i32 [%result1int, %isApply1], [%jumpRes1, %jump1], [%var1int, %start1], [%var1int, %checkCtxt1]
  ret i32 %res1
}

; define cc 10 i32 @c_ident(%ctx* %cp) nounwind {
define ccc i32 @c_ident(%ctx* %cp) nounwind {
   %res = tail call cc 10 %func* @ident(%ctx* %cp)
   ret i32 %res
}

; define cc 10 i32 @main() nounwind {
; entry:
;   %con4raw = alloca i8, i32 add (i32 2, i32 mul (i32 5, i32 4))
;   %con4p = getelementptr i8* %con4raw, i32 2
;   %con4 = bitcast i8* %con4p to %ctx*
;   %con4int = ptrtoint %ctx* %con4 to i32
;   store %ctx <{i32 0, i32 ptrtoint (%func* @ident to i32), i32 0, i32 0, i32 0}>, %ctx* %con4
;   %val1Raw = alloca i8, i32 add (i32 2, i32 mul (i32 5, i32 4))
;   %val1P = getelementptr i8* %val1Raw, i32 2
;   %val1 = ptrtoint i8* %val1P to i32
;   %binding = getelementptr %ctx* %con4, i32 0, i32 4; CTX_BINDING
;   store i32 %val1, i32* %binding
;   call i32 (i8*, ...)* @printf(i8* noalias getelementptr inbounds ([5 x i8]* @d1, i32 0, i32 0)) nounwind
;   call i32 (i8*, ...)* @printf(i8* noalias getelementptr inbounds ([9 x i8]* @.showVal, i32 0, i32 0), i32 %val1) nounwind
;   call i32 (i8*, ...)* @printf(i8* noalias getelementptr inbounds ([9 x i8]* @.showCon, i32 0, i32 0), i32 %con4int) nounwind
; ;  call i32 (i8*, ...)* @printf(i8* noalias getelementptr inbounds ([12 x i8]* @.str, i32 0, i32 0), i32 %res) nounwind
;   %res = tail call cc 10 %func* @ident(%ctx* %con4)
;   ret i32 %res
; }

declare i32 @puts(i8* nocapture) nounwind
declare i32 @printf(i8* nocapture, ...) nounwind

@.str = linkonce constant [12 x i8] c"result: %d\0A\00", align 1
@.showCon = linkonce constant [9 x i8] c"con: %d\0A\00", align 1
@.showVal = linkonce constant [9 x i8] c"val: %d\0A\00", align 1
; debugging strings
@d0 = linkonce constant [5 x i8] c"  0\0A\00", align 1
@d1 = linkonce constant [5 x i8] c"  1\0A\00", align 1
@d2 = linkonce constant [5 x i8] c"  2\0A\00", align 1
@d3 = linkonce constant [5 x i8] c"  3\0A\00", align 1
@d4 = linkonce constant [5 x i8] c"  4\0A\00", align 1
@d5 = linkonce constant [5 x i8] c"  5\0A\00", align 1
