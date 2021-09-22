import { resolvePathPattern } from "./resolvePathPattern";
import assert from 'assert';

it('matches a single path el', function () {
    let res = resolvePathPattern("a/$>1/b", { currentPath: "/xyz/qqq/abc" });
    assert.equal(res, 'a/qqq/b');
    res = resolvePathPattern("a/$<1/b", {currentPath: "/xyz/qqq/abc/nnn" });
    assert.equal(res, 'a/abc/b');
});

it('matches a range', function () {
    let res = resolvePathPattern("a/$B<2<1/b", { currentPath: "/xyz/qqq/abc", basePath: "/lll/mmm/nnn/ppp" });
    assert.equal(res, 'a/mmm/nnn/b');
    res = resolvePathPattern("a/$B<2<0/b", { currentPath: "/xyz/qqq/abc", basePath: "/lll/mmm/nnn/ppp" });
    assert.equal(res, 'a/mmm/nnn/ppp/b');
});

it('matches default string', function () {
    let res = resolvePathPattern("a/$>1:(qqq)/b", { currentPath: "/xyz" });
    assert.equal(res, 'a/qqq/b');
    res = resolvePathPattern("a/b/$>1:$>0", { currentPath: "/xyz" });
    assert.equal(res, 'a/b/xyz');
});

it('matches filename without extension', function () {
    let res = resolvePathPattern("$>1|?.|.dat", { currentPath: "abc/xyz.json" });
    assert.equal(res, 'xyz.dat');
    res = resolvePathPattern("a/b.c/$>1|*.|", { currentPath: "d/xyz.schema.json" });
    assert.equal(res, 'a/b.c/xyz.schema');
});