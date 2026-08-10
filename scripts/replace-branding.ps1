$files = Get-ChildItem -Path "d:\frontend\dvuketoan\src" -Recurse -Include "*.tsx","*.ts"
foreach ($file in $files) {
    $content = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    $changed = $false
    
$pairs = @(
    @('DVUKETOAN', 'VTAX'),
    @('DVuKeToan', 'VTAX'),
    @('DvuKeToan', 'VTAX'),
    @('DVUKeToan', 'VTAX'),
    @('dvuketoan', 'vtax'),

    @('BINOVET', 'VTAX'),
    @('Binovet', 'Vtax'),
    @('binovet', 'vtax'),

    @('dvuketoan-dark', 'vtax-dark'),
    @('dvuketoan-alt', 'vtax-alt'),

    @('bg-molecule', 'bg-finance'),
    @('bg-helix', 'bg-ledger'),

    @('pkd\.dvuketoan@gmail\.com', 'contact@vtax.vn'),

    @('https://dvuketoan\.vn', 'https://vtax.vn'),
    @('http://dvuketoan\.vn', 'https://vtax.vn'),
    @('www\.dvuketoan\.vn', 'vtax.vn'),
    @('dvuketoan\.vn', 'vtax.vn')
)
    foreach ($pair in $pairs) {
        $pattern = $pair[0]
        $replacement = $pair[1]
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $replacement
            $changed = $true
        }
    }
    
    if ($changed) {
        [IO.File]::WriteAllText($file.FullName, $content, [Text.Encoding]::UTF8)
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "Done!"
