let
  lib = import <nixpkgs/lib>;
  allowInsecurePredicateFn = 
    prefixes: pkg: 
    let
      name = pkg.pname + "-" + pkg.version;
    in
    lib.any (prefix: lib.hasPrefix prefix name) prefixes;
in
{ pkgs ? import <nixpkgs> {
  config.allowInsecurePredicate = allowInsecurePredicateFn [
    "nodejs-16"
  ];
} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    docker
    docker-compose
    git
    inotify-tools
    nodejs_16
  ];
}
