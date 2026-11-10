# Ten sam build co build.js, ale bez Node – dla Windows.
# Użycie: powershell -ExecutionPolicy Bypass -File build.ps1
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)
function Read-Src($p) { [IO.File]::ReadAllText((Join-Path $root $p), $utf8) }
function Write-Out($p, $text) { [IO.File]::WriteAllText((Join-Path $root $p), $text, $utf8) }

$order = 'data.js', 'app.js', 'game.js', 'fun.js'   # kolejność ma znaczenie: fun.js na końcu uruchamia aplikację
$version = (Get-Date).ToUniversalTime().ToString('yyyyMMddHHmm')

$scripts = ($order | ForEach-Object { Read-Src "src\$_" }) -join "`n"
$body = (Read-Src 'src\shell.html') + "`n<script>`n" + $scripts + "`n</script>`n"
$head = Read-Src 'web\head.html'
$pwa = Read-Src 'web\pwa.js'

New-Item -ItemType Directory -Force (Join-Path $root 'dist') | Out-Null
Write-Out 'dist\artifact.html' $body

New-Item -ItemType Directory -Force (Join-Path $root 'docs\icons') | Out-Null
Write-Out 'docs\index.html' ($head + $body + "<script>`n" + $pwa + "`n</script>`n</body></html>`n")
Write-Out 'docs\sw.js' ((Read-Src 'web\sw.js').Replace('__VERSION__', $version))
Copy-Item (Join-Path $root 'web\manifest.webmanifest') (Join-Path $root 'docs\manifest.webmanifest') -Force
Write-Out 'docs\.nojekyll' ''
Copy-Item (Join-Path $root 'web\icons\*') (Join-Path $root 'docs\icons') -Force

Write-Host "Gotowe (wersja $version): docs/ (GitHub Pages) i dist/artifact.html (claude.ai)"
